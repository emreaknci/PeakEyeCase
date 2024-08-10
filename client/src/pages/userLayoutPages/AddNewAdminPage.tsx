import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Grid, Paper, Typography, Button, Select, MenuItem } from '@mui/material';

import { toast } from 'react-toastify';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';
import { UserDto } from '../../dtos/users/userDto';
import { Role } from '../../models/role';
import { SignUpDto } from '../../dtos/users/signUpDto';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import { AssignRoleDto } from '../../dtos/users/assignRoleDto';


const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    jobTitle: Yup.string().required('Job Title is required'),
});

const sxValues = {
    p: 2,
    m: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
};

const AddNewAdminPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [users, setUsers] = useState<UserDto[]>();
    const [selectedUser, setSelectedUser] = useState<UserDto>();
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        UserService.getByRole(Role.Author).then((response) => {
            setUsers(response.data.data);
        });
    }, [])

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

    const grantAuth = async (userId: number) => {
        const dto: AssignRoleDto = {
            userId: userId,
            role: Role.Admin
        }
        AuthService.assignRole(dto).then(() => {
            toast.dismiss();
            setUsers(users?.filter(user => user.id !== userId));
            setIsNew(false);
            toast.success(`Admin privileges granted to user ${selectedUser?.fullName}`);
        });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (isNew) {
            formik.handleSubmit();
        }
        else {
            if (!selectedUser) {
                toast.error('Kullanıcı seçiniz.');
                return;
            }
            await grantAuth(selectedUser!.id!);
        }
    }

    const handleSelectedUserChange = (e: any) => {
        setSelectedUser(users?.find(user => user.id === e.target.value));
    }


    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8}  >
                <Paper sx={{ ...sxValues }}>
                    <form onSubmit={handleSubmit} >
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant='h4'>New Admin</Typography>
                                    </Grid>

                                    {/* {users && users.length > 0 &&
                                        <Grid item xs={12} sm={6} sx={{ pt: { xs: 2, sm: 0 } }}>
                                            <Button fullWidth variant="outlined" sx={{ fontWeight: 'bold' }}
                                                color="primary" onClick={() => setIsNew(prev => !prev)} >
                                                {!isNew ? 'Create a new admin user' : 'Select An Exist User'}
                                            </Button>
                                        </Grid>
                                    } */}
                                </Grid>
                            </Grid>
                            {!isNew && users && users.length > 0 && <Grid item xs={12} >
                                <Typography variant='h6'>Select an exist user </Typography>
                                <br />
                                <Select
                                    labelId="other-user-select-label"
                                    id="other-user-select"
                                    variant='standard'
                                    label="Kullanıcı"
                                    fullWidth
                                    onChange={handleSelectedUserChange}
                                >
                                    {users && users.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.fullName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>}
                            {/* {isNew && <>
                                <Grid item xs={12} >
                                    <Typography variant='h6'>Create a new admin user</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextFieldComponent formik={formik} fieldName='fullName' label='Full Name' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextFieldComponent formik={formik} fieldName='jobTitle' label='Job Title' />
                                </Grid>
                                <Grid item xs={12} >
                                    <CustomTextFieldComponent formik={formik} fieldName='email' label='Email' type='email' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextFieldComponent formik={formik} fieldName='password' label="Password" type="password" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextFieldComponent formik={formik} fieldName='confirmPassword' label="Confirm Password" type="password" />
                                </Grid>
                            </>} */}
                            {users && users.length > 0 && <Grid item xs={12} sx={{ pt: { xs: 2, sm: 0 } }}>
                                <Button fullWidth variant="outlined" sx={{ fontWeight: 'bold' }}
                                    color="primary" type="submit" onClick={() => console.log(formik.errors)} >
                                    Add New Admin
                                </Button>
                            </Grid>}

                            {!users &&
                                <Grid item xs={12} >
                                    <Typography variant='h6'>There is no user to grant admin privileges.</Typography>
                                </Grid>
                            }

                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AddNewAdminPage;

