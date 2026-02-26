import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'

const Navbar = () => {
  return (
    <AppBar position="static" elevation={0} sx={{ background: '#fff', borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar sx={{ px: 3 }}>
        <LocalHospitalIcon sx={{ color: '#1976d2', mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#1a1a1a', fontWeight: 700 }}>
          Hospital Management
        </Typography>
        <Button href="http://localhost:3000" sx={{ color: '#555', textTransform: 'none', mr: 1 }}>Home</Button>
        <Button href="http://localhost:3000/create" sx={{ color: '#555', textTransform: 'none', mr: 1 }}>Add Doctor</Button>
        <Button href="http://localhost:3000/book" variant="contained" disableElevation sx={{ textTransform: 'none', borderRadius: 2 }}>
          Book Appointment
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar