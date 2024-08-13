import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';
import { Link as MuiLink } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTextAreaComponent from '../../components/common/CustomTextAreaComponent';
import { toast } from 'react-toastify';



const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    content: Yup.string().required('Content is required'),
});

const ContactPage = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: 'John',
            surname: 'Doe',
            email: 'john@doe.com',
            subject: 'Lorem ipsum dolor sit',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum vitae libero labore, nulla commodi molestias dolores totam distinctio amet quae dicta ipsam recusandae, harum quidem illum iure, praesentium magnam voluptates? Tenetur, maiores dicta. Necessitatibus maiores mollitia cumque, delectus minima aperiam illo possimus quisquam illum assumenda pariatur dolor odio, voluptatem architecto.'
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            toast.success('We have received your message. We will contact you as soon as possible.')
        },
    });
    return (
        <Grid container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} sm={9} md={8}>
                <Typography component="h1" variant="h5">Contact</Typography>
                <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: 16 }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <CustomTextFieldComponent formik={formik} fieldName='name' label='Name' type='text' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextFieldComponent formik={formik} fieldName='surname' label='Surname' type='text' />
                        </Grid>
                    </Grid>
                    <CustomTextFieldComponent formik={formik} fieldName='email' label='Email' type='email' />
                    <CustomTextFieldComponent formik={formik} fieldName='subject' label='Subject' type='text' />
                    <CustomTextAreaComponent formik={formik} fieldName='content' label='Content' />
                    <Button type="submit" fullWidth variant="outlined" color="primary" sx={{ my: 2 }}>
                        Send
                    </Button>
                </form>
            </Grid>
        </Grid>

    )
}

export default ContactPage