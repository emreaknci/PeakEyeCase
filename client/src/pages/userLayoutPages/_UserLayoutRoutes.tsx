import Navbar from '../../components/layouts/user/Navbar'
import { Box } from '@mui/material'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import MyBlogs from './MyBlogs'
import AdminsPage from './AdminsPage'
import AddNewAdminPage from './AddNewAdminPage'
import AuthorsPage from './AuthorsPage'
import AuthorDetailPage from './AuthorDetailPage'
import AddNewBlogPage from './AddNewBlog'
import EditBlogPage from './EditBlogPage'
import BlogsPage from './BlogsPage'
import CommentsPage from './CommentsPage'
import MyComments from './MyComments'
import CategoriesPage from './CategoriesPage'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import ChangePasswordPage from './ChangePasswordPage'


const UserLayoutRoutes = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authContext.isAuthenticated && authContext.isTokenChecked) {
  //     navigate("/");
  //   }
  // }, [authContext.isAuthenticated, authContext.isTokenChecked, navigate])
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 3 }, pt: { xs: 10, md: 10 } }}>
        <Routes>
          {authContext.isAuthenticated && authContext.isAdmin && <>
            <Route path="/admins" element={<AdminsPage />} />
            <Route path="/admins/add-admin" element={<AddNewAdminPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/:id" element={<AuthorDetailPage />} />
            <Route path="/authors/:name/comments" element={<CommentsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs?category=:category" element={<BlogsPage />} />
            <Route path="/blogs?author=:author" element={<BlogsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/comments" element={<CommentsPage />} />
          </>
          }
          <Route path="/" element={<ProfilePage />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/my-blogs/add-new-blog" element={<AddNewBlogPage />} />
          <Route path="/my-blogs/edit-blog/:id" element={<EditBlogPage />} />
          <Route path="/my-comments" element={<MyComments />} />
          <Route path="/my-profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />

          <Route path="*" element={<Navigate to={"/me"} />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default UserLayoutRoutes