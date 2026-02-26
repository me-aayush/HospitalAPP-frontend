import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Matches your DOCTOR model: id, specialization, maxPatients, currentAppointments
const initial = { id: "", specialization: "", maxPatients: 0, currentAppointments: 0 };

const Create = () => {
  const specializationList = [
    { name: "Cardiology" },
    { name: "Neurology" },
    { name: "Orthopedics" },
    { name: "Pediatrics" },
    { name: "Dermatology" },
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/addDoctors", form)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate('/');
  };

  const { id, specialization, maxPatients, currentAppointments } = form;

  // Radio-like: only one specialization selected at a time
  const handleSpecializationChange = (e) => {
    setForm({ ...form, specialization: e.target.value });
  };

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Add New Doctor
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Doctor ID */}
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            label="Doctor ID"
            variant="outlined"
            value={id}
          />

          {/* Max Patients */}
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, maxPatients: e.target.value })}
            label="Max Patients"
            variant="outlined"
            value={maxPatients}
          />

          {/* Current Appointments */}
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, currentAppointments: e.target.value })}
            label="Current Appointments"
            variant="outlined"
            value={currentAppointments}
          />

          {/* Specialization - checkbox list (same structure as skills) */}
          <Box sx={{ margin: "1% auto" }}>
            <h3>Please select specialization</h3>
            <ul>
              {specializationList.map(({ name }, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div>
                        <input
                          type="radio"
                          id={`specialization-${index}`}
                          name="specialization"
                          value={name}
                          onChange={handleSpecializationChange}
                        />
                        <label htmlFor={`specialization-${index}`}>{name}</label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* Show selected */}
            {specialization && (
              <Typography variant="body2" sx={{ color: "#585858" }}>
                Selected: <strong>{specialization}</strong>
              </Typography>
            )}
          </Box>

          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;