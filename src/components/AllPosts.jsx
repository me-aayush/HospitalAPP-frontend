import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Edit';

import {
  Box,
    Card,
    Grid,
    InputAdornment,
    TextField,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState("");
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

const handleEdit = (id) => {
  navigate("/edit",{state:{id}});
}

    useEffect(() => {
      const fetchDoctors = async () => {
        // Filters by specialization on frontend
        const response = await axios.get(`http://localhost:8080/AllDoctors`);
        const filtered = response.data.filter((d) =>
          d.specialization.toLowerCase().includes(query.toLowerCase())
        );
        setPost(filtered);
      };

        const fetchInitialDoctors = async () => {
            const response = await axios.get(`http://localhost:8080/AllDoctors`);
            setPost(response.data);
        }

         fetchInitialDoctors();
         if (query.length === 0) fetchInitialDoctors();
         if (query.length > 2) fetchDoctors();

      }, [query]);

      const handleDelete = (id) => {
        async function deleteDoctor() {
          await axios.delete(`http://localhost:8080/DeleteDoctor/${id}`);
        }
        deleteDoctor();
        window.location.reload();
      }

  return (
    <>
      <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12} sx={12} md={12} lg={12}>
      <Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search by specialization..."
            sx={{ width: "75%", padding: "2% auto" }}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>
      {post &&
        post.map((p) => {
          return (
            <Grid key={p.id} item xs={12} md={6} lg={4}>
              <Card sx={{ padding: "3%", overflow: "hidden", width: "84%", backgroundColor:"#ADD8E6" }}>
                <Typography        
                  variant="h5"
                  sx={{ fontSize: "2rem", fontWeight: "600", fontFamily:"sans-serif" }}
                >
                  Doctor #{p.id}
                </Typography>
                <Typography sx={{ color: "#585858", marginTop:"2%", fontFamily:"cursive" }} variant="body" >
                  Specialization: {p.specialization}
                </Typography>
                <br />
                <br />
                <Typography variant="h6" sx={{ fontFamily:"unset", fontSize:"400"}}>
                  Max Patients: {p.maxPatients}
                </Typography>
                <Typography sx={{fontFamily:"serif", fontSize:"400"}} gutterBottom variant="body">
                  Current Appointments: {p.currentAppointments}
                </Typography>
               <DeleteIcon onClick={() => handleDelete(p.id)} />
                <EditIcon onClick={() => handleEdit(p.id)} />
              </Card>
            </Grid>
          );
        })}
    </Grid>
    </>
  )
}

export default Search