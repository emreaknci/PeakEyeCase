import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';
import { SignUpDto } from '../../dtos/signUpDto';
import { Link as MuiLink } from '@mui/material';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  jobTitle: Yup.string().required('Job Title is required'),
  about: Yup.string().required('About is required'),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      jobTitle: '',
      about: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitted(true);
      await signUp();
    },
  });

  const signUp = async () => {
    const signUpDto: SignUpDto = {
      fullName: formik.values.fullName,
      email: formik.values.email,
      password: formik.values.password,
      confirmPassword: formik.values.confirmPassword,
      jobTitle: formik.values.jobTitle,
      about: formik.values.about,
    };

    console.log(signUpDto);
  }

  return (
    <Container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sm={8} md={6}>
          <div style={{
            margin: 'auto', display: 'flex',
            flexDirection: 'column', alignItems: 'center', padding: '0 2rem',
          }}>
            <LockOutlinedIcon fontSize="large" />
            <Typography component="h1" variant="h5">Sign Up</Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: 16 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomTextFieldComponent formik={formik} fieldName='fullName' label='Full Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextFieldComponent formik={formik} fieldName='jobTitle' label='Job Title' />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent formik={formik} fieldName='email' label='Email' type='email' />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent formik={formik} fieldName='about' label='About' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextFieldComponent formik={formik} fieldName='password' label='Password' type='password' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextFieldComponent formik={formik} fieldName='confirmPassword' label='Confirm Password' type='password' />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, width: '100%' }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <MuiLink style={{ cursor: "pointer" }} onClick={() => navigate("/sign-in")} color="primary">
                    Sign In
                  </MuiLink>
                </Typography>
                <Typography variant="body2">
                  Return to{' '}
                  <MuiLink style={{ cursor: "pointer" }} onClick={() => navigate("/")} color="primary">
                    Home
                  </MuiLink>
                </Typography>
              </Box>

              <Button type="submit" fullWidth variant="outlined" color="primary" sx={{ my: 2 }}>
                Sign Up
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpPage;
