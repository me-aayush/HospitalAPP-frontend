import React, { useState } from "react"
import { Typography, Button, Box, Alert, ToggleButton, ToggleButtonGroup } from "@mui/material"
import axios from "axios"

const specializationList = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"]

const BookAppointment = () => {
  const [selectedSpec, setSelectedSpec] = useState("")
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedSpec) {
      setMessage("Please select a specialization.")
      setIsSuccess(false)
      return
    }

    axios.post(`http://localhost:8080/Booking?specialization=${selectedSpec}`)
      .then((resp) => {
        setMessage(resp.data)
        setIsSuccess(resp.data.includes("BOOKED"))
      })
      .catch((error) => {
        setMessage("Something went wrong. Please try again.")
        setIsSuccess(false)
        console.log(error)
      })
  }

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto', mt: 5, px: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={1}>Book Appointment</Typography>
      <Typography variant="body2" sx={{ color: '#888', mb: 3 }}>
        Select a specialization to find an available doctor.
      </Typography>

      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="body2" fontWeight={600} mb={1} sx={{ color: '#444' }}>Specialization</Typography>
        <ToggleButtonGroup
          exclusive value={selectedSpec}
          onChange={(e, val) => { if (val) { setSelectedSpec(val); setMessage(null) } }}
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
          sx={{ borderRadius: 2, textTransform: 'none', py: 1.2, mb: 2 }}>
          Book Appointment
        </Button>

        {message && (
          <Alert severity={isSuccess ? "success" : "error"} sx={{ borderRadius: 2 }}>
            {message}
          </Alert>
        )}
      </form>
    </Box>
  )
}

export default BookAppointment