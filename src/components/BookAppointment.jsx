import React, { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Box,
  Card,
  Alert,
} from "@mui/material";
import axios from "axios";

const BookAppointment = () => {
  const specializationList = [
    { name: "Cardiology" },
    { name: "Neurology" },
    { name: "Orthopedics" },
    { name: "Pediatrics" },
    { name: "Dermatology" },
  ];

  const [selectedSpec, setSelectedSpec] = useState("");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSpec) {
      setMessage("Please select a specialization.");
      setIsSuccess(false);
      return;
    }

    axios.post(`https://hospital-app-production-c2e2.up.railway.app/Booking?specialization=${selectedSpec}`)
      .then((resp) => {
        setMessage(resp.data);
        setIsSuccess(resp.data.includes("BOOKED"));
      })
      .catch((error) => {
        setMessage("Something went wrong. Please try again.");
        setIsSuccess(false);
        console.log(error);
      });
  };

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Book Appointment
      </Typography>

      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ margin: "1% auto" }}>
            <h3>Please select specialization</h3>
            <ul>
              {specializationList.map(({ name }, index) => (
                <li key={index}>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id={`specialization-${index}`}
                        name="specialization"
                        value={name}
                        checked={selectedSpec === name}
                        onChange={(e) => {
                          setSelectedSpec(e.target.value);
                          setMessage(null);
                        }}
                      />
                      <label htmlFor={`specialization-${index}`}>{name}</label>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Box>

          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Book Appointment
          </Button>

          {message && (
            <Card
              sx={{
                width: "50%",
                margin: "2% auto",
                padding: "3%",
                backgroundColor: isSuccess ? "#d4edda" : "#f8d7da",
                border: isSuccess ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
              }}
            >
              <Alert severity={isSuccess ? "success" : "error"} sx={{ background: "transparent", padding: 0 }}>
                {message}
              </Alert>
            </Card>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default BookAppointment;
