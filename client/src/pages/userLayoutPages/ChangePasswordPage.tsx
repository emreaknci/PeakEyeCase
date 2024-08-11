import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Grid, Typography, Button } from '@mui/material';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthService from '../../services/auth.service';
import { ChangePasswordDto } from '../../dtos/users/changePasswordDto';
import { AuthContext } from '../../contexts/AuthContext';

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string().required('New Password is required'),
});
const ChangePasswordPage = () => {
  const { logout } = useContext(AuthContext)
  const [submitted, setSubmitted] = useState(false);


  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmitted(true);

      const dto: ChangePasswordDto = { oldPassword: formik.values.currentPassword, newPassword: formik.values.newPassword }
      AuthService.changePassword(dto).then(response => {
        logout();
      })
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    formik.handleSubmit();
  }

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} container justifyContent="center">
        <AccountCircleIcon style={{ fontSize: "6rem" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
          Change Password
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} sx={{ margin: 'auto' }} >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} textAlign={"center"} >

            <Grid item xs={12} >
              <CustomTextFieldComponent formik={formik} fieldName="currentPassword" label="Current Password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <CustomTextFieldComponent formik={formik} fieldName="newPassword" label="New Password" type="password" />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="outlined"
                fullWidth sx={{ fontWeight: 'bold', mt: 2 }}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default ChangePasswordPage