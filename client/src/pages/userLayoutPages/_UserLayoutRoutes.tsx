import Navbar from '../../components/layouts/user/Navbar'
import { Box, Container, Paper } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import MyBlogs from './MyBlogs'
import AdminsPage from './AdminsPage'
import AddNewAdminPage from './AddNewAdminPage'

const UserLayoutRoutes = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 3 }, pt: { xs: 10, md: 10 } }}>
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/my-profile" element={<ProfilePage />} />
            <Route path="/my-blogs" element={<MyBlogs />} />
            <Route path="/admins" element={<AdminsPage />} />
            <Route path="/add-admin" element={<AddNewAdminPage />} />

            <Route path="*" element={<Navigate to={"/me"} />} />
          </Routes>
      </Box>
    </Box>
  )
}

export default UserLayoutRoutes