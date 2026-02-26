import React, { useState } from "react"
import axios from "axios"
import { Typography, TextField, Button, Box, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useNavigate } from "react-router-dom"

const initial = { id: "", specialization: "", maxPatients: 0, currentAppointments: 0 }

const specializationList = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"]

const Create = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initial)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/addDoctors", form)
      .then((resp) => console.log(resp.data))
      .catch((error) => console.log(error))
    navigate('/')
  }

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto', mt: 5, px: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>Add New Doctor</Typography>

      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth type="number" label="Doctor ID" variant="outlined"
          value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth type="number" label="Max Patients" variant="outlined" required
          value={form.maxPatients} onChange={(e) => setForm({ ...form, maxPatients: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth type="number" label="Current Appointments" variant="outlined" required
          value={form.currentAppointments} onChange={(e) => setForm({ ...form, currentAppointments: e.target.value })}
          sx={{ mb: 3 }}
        />

        <Typography variant="body2" fontWeight={600} mb={1} sx={{ color: '#444' }}>Specialization</Typography>
        <ToggleButtonGroup
          exclusive value={form.specialization}
          onChange={(e, val) => val && setForm({ ...form, specialization: val })}
          sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}
        >
          {specializationList.map((name) => (
            <ToggleButton key={name} value={name} size="small"
              sx={{ borderRadius: '20px !important', border: '1px solid #ddd !important', textTransform: 'none', px: 2 }}>
              {name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Button fullWidth variant="contained" type="submit" disableElevation
          sx={{ borderRadius: 2, textTransform: 'none', py: 1.2 }}>
          Add Doctor
        </Button>
      </form>
    </Box>
  )
}

export default Create