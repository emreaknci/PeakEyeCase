import { Button, Container, Grid, Paper, Typography } from '@mui/material'
import { UserDto } from '../../dtos/users/userDto'
import { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  jobTitle: Yup.string().required('Job Title is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  about: Yup.string().required('About is required'),
});

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null)
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("My Profile");

  useEffect(() => {
    const user: UserDto = {
      id: 1,
      fullName: 'John Doe',
      jobTitle: 'Software Engineer',
      email: 'john@doe.com',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    setCurrentUser(user)
  }, [])

  const formik = useFormik({
    initialValues: {
      fullName: currentUser?.fullName || '',
      jobTitle: currentUser?.jobTitle || '',
      email: currentUser?.email || '',
      about: currentUser?.about || '',
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmitted(true);
      console.log(values)
    },
  });

  const handleEdit = () => {
    setEditing(true);
    setTitle("Edit Profile");
    formik.setValues({
      fullName: currentUser?.fullName || '',
      jobTitle: currentUser?.jobTitle || '',
      email: currentUser?.email || '',
      about: currentUser?.about || '',
    });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editing) {
      formik.handleSubmit();
    } else {
      handleEdit();
    }
  };

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} container justifyContent="center">
        <AccountCircleIcon style={{ fontSize: "6rem" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} sx={{ margin: 'auto' }} >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} textAlign={"center"} >
            {!editing ?
              <>
                <Grid item xs={12} >
                  <Typography variant="h6">
                    <b>Full Name:</b> {currentUser?.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <b>Job Title:</b> {currentUser?.jobTitle}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <b>Email:</b> {currentUser?.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <b>About:</b> {currentUser?.about}
                  </Typography>
                </Grid>
              </>
              : <>
                <Grid item xs={12} sm={6}>
                  <CustomTextFieldComponent formik={formik} fieldName="fullName" label="Full Name" type="text" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextFieldComponent formik={formik} fieldName="jobTitle" label="Job Title" type="text" />
                </Grid>
                <Grid item xs={12} >
                  <CustomTextFieldComponent formik={formik} fieldName="email" label="Email" type="email" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent formik={formik} fieldName="about" label="About" type="text" />
                </Grid>
              </>
            }
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="outlined"
                fullWidth sx={{ fontWeight: 'bold', mt: 2 }}
              >
                {editing ? "Save" : "Edit"}
              </Button>

              {editing && <Button variant="outlined"
                sx={{ fontWeight: 'bold', mt: 2 }}
                fullWidth color="error"
                onClick={() => {
                  setEditing(false);
                  formik.resetForm();
                  setTitle("Profile Page");
                }}
              >
                Cancel
              </Button>}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default ProfilePage