import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Category } from '../../models/category';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';
import ImagePickerComponent from '../../components/common/ImagePickerComponent';
import ReactQuill from 'react-quill';
import { Label } from '@mui/icons-material';
import { BlogEditDto } from '../../dtos/blogs/blogEditDto';
import { BlogDetailDto } from '../../dtos/blogs/blogDetailDto';


const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string()
        .required('Content is required')
        .test('isNotEmptyContent', 'Content is required', value => value !== '<p><br></p>'),
    categoryId: Yup.number().required('Category is required'),
});

const sxValues = {
    p: 2, m: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
};




const EditBlogPage = () => {
    const {id}= useParams();
    const [categories, setCategories] = useState<Category[]>();
    const [submitted, setSubmitted] = useState(false);

    const [blog, setBlog] = useState<BlogDetailDto>();

    useEffect(() => {
        if(!id) return;
        const blog: BlogDetailDto = {
            id: 1,
            title: 'Blog Title',
            content: '<p> <span style="font-size: 18px;">Quill Rich Text Editor</span> </p> <p> <br> </p> <p>Quill is a free, <a href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its <a href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a <a href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p> <p> <br> </p> <ul> <li>Fast and lightweight</li> <li>Semantic markup</li> <li>Standardized HTML between browsers</li> <li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li> </ul> <p> <br> </p> <p> <span style="font-size: 18px;">Downloads</span> </p> <p> <br> </p> <ul> <li> <a href="https://quilljs.com" target="_blank">Quill.js</a>, the free, open source WYSIWYG editor</li> <li> <a href="https://zenoamaro.github.io/react-quill" target="_blank">React-quill</a>, a React component that wraps Quill.js</li> </ul>',
            categoryId: 2,
            categoryName: 'Technology',
            createdAt: new Date(),
            imageUri: '',
            authorFullName: 'John Doe',
            authorId: 1,
            isDeleted: false,
            isHidden: false,
        }
        setBlog(blog);
        formik.setValues({
            id: blog.id,
            title: blog.title,
            content: blog.content,
            categoryId: blog.categoryId,
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const formik = useFormik({
        initialValues: {
            id: 0,
            title: '',
            content: '',
            categoryId: 0,
        },
        validationSchema,
        onSubmit: async (values) => {
            setSubmitted(true);
            console.log(values);

            const dto:BlogEditDto = {
                id: values.id,
                title: values.title,
                content: values.content,
                categoryId: values.categoryId,
            }

            
            await editBlog(dto);
        },
    });

    const editBlog = async (dto:BlogEditDto) => {
        console.log(dto);
        toast.dismiss();
        toast.info('Blog edited successfully');
    }

    const getCategories = async () => {
        const categories: Category[] = [
            { id: 1, name: 'Technology' },
            { id: 2, name: 'Fashion' },
            { id: 3, name: 'Health' },
            { id: 4, name: 'Sports' },
            { id: 5, name: 'Education' },
        ];

        setCategories(categories);
    }

    useEffect(() => {
        getCategories();
    }, []);


    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={10} lg={8} >
                <Paper sx={{ ...sxValues }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Grid container >
                                    <Grid item xs={12} sm={9}>
                                        <Typography variant='h4'>Edit Blog</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
                                        <Button fullWidth variant="outlined" sx={{ fontWeight: 'bold' }}
                                            color="primary" type="submit" onClick={() => setSubmitted(true)} >
                                            Edit
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


export default EditBlogPage;