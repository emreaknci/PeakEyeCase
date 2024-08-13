import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';
import { SignUpDto } from '../../dtos/users/signUpDto';
import { Link as MuiLink } from '@mui/material';
import { SignInDto } from '../../dtos/users/signInDto';
import { AuthContext } from '../../contexts/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignInPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: 'admin@admin.com',
      password: '123456',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitted(true);
      const dto = { email: values.email, password: values.password } as SignInDto;

      await authContext.signIn(dto);
    },
  });


  return (
    <Container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sm={8} md={6}>
          <div style={{
            margin: 'auto', display: 'flex',
            flexDirection: 'column', alignItems: 'center', padding: '0 2rem',
          }}>
            <LockOutlinedIcon fontSize="large" />
            <Typography component="h1" variant="h5">Sign In</Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: 16 }}>

              <CustomTextFieldComponent formik={formik} fieldName='email' label='Email' type='email' />
              <CustomTextFieldComponent formik={formik} fieldName='password' label='Password' type='password' />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, width: '100%' }}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <MuiLink style={{ cursor: "pointer" }} onClick={() => navigate("/sign-up")} color="primary">
                    Sign Up
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
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInPage;
