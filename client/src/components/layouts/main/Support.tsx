import { Box, Typography, Button, AppBar, Toolbar, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextFieldComponent from '../../common/CustomTextFieldComponent';

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
});

const Support = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        formik.resetForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleToggle = () => {
        setOpen(!open);
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',

        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    });

    return (
        <>
            <IconButton color="primary" size='large'
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={handleToggle}
            >
                <LiveHelpIcon fontSize='large' />
            </IconButton>

            {open && (
                <Box
                    sx={{
                        position: 'fixed', bottom: isMobile ? 0 : 20,
                        right: isMobile ? 0 : 20, width: isMobile ? '100%' : 400,
                        maxHeight: '90vh', backgroundColor: 'background.paper',
                        height: isMobile ? '100%' : 'auto',
                        boxShadow: 3, borderRadius: 1,
                        overflow: 'hidden', zIndex: 1300,
                    }}
                >
                    <AppBar position="static" >
                        <Toolbar>
                            <Typography variant="h6" sx={{ flex: 1 }}> Live Support </Typography>
                            <IconButton edge="end" color="inherit" onClick={handleToggle}> <CloseIcon /> </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom> Please fill the form below to get support </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <CustomTextFieldComponent formik={formik} fieldName='fullName' label='Full Name' />
                            <CustomTextFieldComponent formik={formik} fieldName='email' label='Email' type='email' />
                            <CustomTextFieldComponent formik={formik} fieldName='subject' label='Subject' />

                            <Button fullWidth type="submit" variant="outlined" color="primary" sx={{ mt: 2 }}>
                                Share
                            </Button>
                        </form>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Support;