import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Card, Grid, InputAdornment, TextField, Typography, Chip, IconButton } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const [query, setQuery] = useState("")
  const [post, setPost] = useState(null)
  const navigate = useNavigate()

  const handleEdit = (id) => navigate("/edit", { state: { id } })

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axios.get(`http://localhost:8080/AllDoctors`)
      const filtered = response.data.filter((d) =>
        d.specialization.toLowerCase().includes(query.toLowerCase())
      )
      setPost(filtered)
    }

    const fetchInitialDoctors = async () => {
      const response = await axios.get(`http://localhost:8080/AllDoctors`)
      setPost(response.data)
    }

    fetchInitialDoctors()
    if (query.length === 0) fetchInitialDoctors()
    if (query.length > 2) fetchDoctors()
  }, [query])

  const handleDelete = (id) => {
    async function deleteDoctor() {
      await axios.delete(`http://localhost:8080/DeleteDoctor/${id}`)
    }
    deleteDoctor()
    window.location.reload()
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Search bar */}
      <TextField
        fullWidth
        placeholder="Search by specialization..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#aaa' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': { borderRadius: 2, background: '#fafafa' }
        }}
      />

      {/* Doctor count */}
      {post && (
        <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
          {post.length} doctor{post.length !== 1 ? 's' : ''} found
        </Typography>
      )}

      {/* Cards */}
      <Grid container spacing={2}>
        {post && post.map((p) => (
          <Grid key={p.id} item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Doctor #{p.id}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => handleEdit(p.id)} sx={{ color: '#1976d2' }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(p.id)} sx={{ color: '#d32f2f' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {/* Specialization chip */}
              <Chip label={p.specialization} size="small" sx={{ mb: 2, background: '#e3f2fd', color: '#1565c0' }} />

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888' }}>Max Patients</Typography>
                  <Typography variant="body2" fontWeight={600}>{p.maxPatients}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888' }}>Current Appointments</Typography>
                  <Typography variant="body2" fontWeight={600}>{p.currentAppointments}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Search