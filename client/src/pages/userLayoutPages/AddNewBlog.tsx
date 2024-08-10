import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../models/category';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';
import ImagePickerComponent from '../../components/common/ImagePickerComponent';
import ReactQuill from 'react-quill';
import { Label } from '@mui/icons-material';
import CategoryService from '../../services/category.service';
import BlogService from '../../services/blog.service';


const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string()
        .required('Content is required')
        .test('isNotEmptyContent', 'Content is required', value => value !== '<p><br></p>'),
    categoryId: Yup.number().required('Category is required'),
    image: Yup.mixed()
        .required('Image is required')
        .test('fileType', 'Invalid file type', value => value && value instanceof File),
});

const sxValues = {
    p: 2, m: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
};




const AddNewBlogPage = () => {
    const navigate=useNavigate();
    const [categories, setCategories] = useState<Category[]>();
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);


    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            categoryId: '',
            image: coverImage,
        },
        validationSchema,
        onSubmit: async (values) => {
            setSubmitted(true);

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('categoryId', values.categoryId);
            formData.append('image', values.image as File, values.image?.name);
            formData.append('authorId', "1");
            await addBlog(formData);
        },
    });

    const addBlog = async (formData: FormData) => {
        BlogService.create(formData).then((response) => {
            navigate('/me/my-blogs');
        })
    }


    useEffect(() => {
        const getCategories = async () => {
            CategoryService.getAll().then((response) => {
                setCategories(response.data.data);
            });
        }
        getCategories();
    }, []);



    useEffect(() => {
        formik.setFieldValue('image', coverImage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coverImage])

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={10} lg={8} >
                <Paper sx={{ ...sxValues }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Grid container >
                                    <Grid item xs={12} sm={9}>
                                        <Typography variant='h4'>New Blog</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
                                        <Button fullWidth variant="outlined" sx={{ fontWeight: 'bold' }}
                                            color="primary" type="submit" onClick={() => setSubmitted(true)} >
                                            Publish
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <CustomTextFieldComponent formik={formik} fieldName='title' label="Title" />
                            </Grid>
                            {categories && <Grid item xs={12}>
                                <InputLabel id="category">Select a Category</InputLabel>
                                <Select
                                    label='Select a Category' fullWidth variant='standard'
                                    value={formik.values.categoryId}
                                    onChange={(e) => formik.setFieldValue('categoryId', e.target.value)}
                                >
                                    <MenuItem disabled value="Select a Category">Select a Category</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {submitted && <Typography variant='caption' color='error'>{formik.errors.categoryId}</Typography>}
                            </Grid>}
                            <Grid item xs={12}>
                                <ImagePickerComponent fullWidth setSelectedImage={setCoverImage} formik={formik} />
                                {submitted && <Typography variant='caption' color='error'> {formik.errors.image} </Typography>}
                            </Grid>
                            <Grid item xs={12} >
                                <Typography>Content</Typography>
                                <ReactQuill theme="snow" value={formik.values.content} onChange={(value) => formik.setFieldValue('content', value)} />
                                {submitted && <Typography variant='caption' color='error'> {formik.errors.content} </Typography>}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};


export default AddNewBlogPage;