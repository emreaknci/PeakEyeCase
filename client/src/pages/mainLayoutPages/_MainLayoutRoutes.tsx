import React, { useEffect, useState } from 'react'
import Navbar from '../../components/layouts/main/Navbar'
import { Container } from '@mui/material'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import Footer from '../../components/layouts/main/Footer';
import BlogDetailPage from './BlogDetailPage';
import AuthorPage from './AuthorPage';
import ContactPage from './ContactPage';
import Categories from '../../components/layouts/main/Categories';
import { Category } from '../../models/category';
import CategoryService from '../../services/category.service';

const MainLayoutRoutes = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    CategoryService.getAll().then(response => {
      const data=response.data.data as Category[];
      setCategories(response.data.data.filter((c:Category)=>!c.isDeleted));
    });
  }, []);
  return (
    <>
      <Navbar />
      <Categories categories={categories}/>
      <Container sx={{
        my: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<HomePage />} />
          <Route path="/category/:id" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/author/:id" element={<AuthorPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Container>
      <Footer categories={categories}/>
    </>)
}

export default MainLayoutRoutes