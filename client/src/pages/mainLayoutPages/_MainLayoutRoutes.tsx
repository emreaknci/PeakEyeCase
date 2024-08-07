import React from 'react'
import Navbar from '../../components/layouts/main/Navbar'
import { Container } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import Footer from '../../components/layouts/main/Footer';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

const MainLayoutRoutes = () => {
  return (
    <>
      <Navbar />
      <Container sx={{
        my: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />          
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Container>
      <Footer />
    </>)
}

export default MainLayoutRoutes