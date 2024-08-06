import React from 'react'
import Navbar from '../../components/layouts/user/Navbar'
import { Box, Container } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProfilePage from './ProfilePage'

const UserLayoutRoutes = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/my-profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to={"/me"} />} />
        </Routes>
      </Container>
    </>
  )
}

export default UserLayoutRoutes