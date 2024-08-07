import Navbar from '../../components/layouts/user/Navbar'
import { Box, Container, Paper } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProfilePage from './ProfilePage'

const UserLayoutRoutes = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 3 }, pt: { xs: 10, md: 10 } }}>
        <Paper elevation={3} variant='outlined' sx={{ bgcolor: 'background.paper', p: 2, border: "none" }}>
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/my-profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to={"/me"} />} />
          </Routes>
        </Paper>
      </Box>
    </Box>
  )
}

export default UserLayoutRoutes