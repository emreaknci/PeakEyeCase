import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Category } from '../../models/category';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';
import ReactQuill from 'react-quill';
import { BlogEditDto } from '../../dtos/blogs/blogEditDto';
import { BlogDetailDto } from '../../dtos/blogs/blogDetailDto';
import BlogService from '../../services/blog.service';
import CategoryService from '../../services/category.service';
import { JwtHelper } from '../../utils/security/jwtHelper';
import StorageService from '../../services/storage.service';


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
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>();
    const [submitted, setSubmitted] = useState(false);

    const [blog, setBlog] = useState<BlogDetailDto>();

    useEffect(() => {
        if (!id) return;

        BlogService.getById(id).then((response) => {
            const data = response.data.data as BlogDetailDto;

            if (data.authorId.toString() !== JwtHelper.getTokenInfos(StorageService.getAccessToken()!).user) {
                toast.error('You are not authorized to edit this blog');
                navigate('/me/my-blogs');
                return;
            }

            setBlog(data);
            formik.setValues({
                id: data.id,
                title: data.title,
                content: data.content,
                categoryId: data.categoryId,
            });
        });

        const getCategories = async () => {
            CategoryService.getAll().then((response) => {
                setCategories(response.data.data);
            });            
        }
        getCategories();

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

            const dto: BlogEditDto = {
                id: values.id,
                title: values.title,
                content: values.content,
                categoryId: values.categoryId,
            }
            console.log(dto);


            await editBlog(dto);
        },
    });

    const editBlog = async (dto: BlogEditDto) => {
        console.log(dto);
        BlogService.update(dto).then((response) => {
            navigate('/me/my-blogs');
        })
    }

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