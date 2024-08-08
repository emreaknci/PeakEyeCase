import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';

import { useNavigate, useSearchParams } from 'react-router-dom';
import DialogComponent from '../../components/common/DialogComponent';
import { BlogListDto } from '../../dtos/blogs/blogListDto';
import CategoryButton from '../../components/layouts/main/CategoryButton';

const BlogsPage = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<BlogListDto[]>();
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState('');



    const [currentBlog, setCurrentBlog] = useState<BlogListDto | undefined>(undefined);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuClick = (e: any, blog: BlogListDto) => {
        setAnchorEl(e.currentTarget);
        setCurrentBlog(blog);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentBlog(undefined);
    };


    useEffect(() => {
        const getBlogs = async () => {
            const blogs: BlogListDto[] = [
                {
                    id: 1,
                    title: "Understanding TypeScript",
                    categoryId: 101,
                    categoryName: "Programming",
                    createdAt: new Date("2023-08-01"),
                    imageUri: "https://example.com/images/typescript.jpg",
                    authorFullName: "John Doe",
                    authorId: 1,
                    authorImageUri: "https://example.com/images/john_doe.jpg",
                    isDeleted: false,
                    isHidden: true
                },
                {
                    id: 2,
                    title: "React Hooks in Depth",
                    categoryId: 101,
                    categoryName: "Programming",
                    createdAt: new Date("2023-07-15"),
                    imageUri: "https://example.com/images/react_hooks.jpg",
                    authorFullName: "Jane Smith",
                    authorId: 2,
                    authorImageUri: "https://example.com/images/jane_smith.jpg",
                    isDeleted: true,
                    isHidden: false
                },
                {
                    id: 3,
                    title: "Exploring Node.js",
                    categoryId: 102,
                    categoryName: "Backend Development",
                    createdAt: new Date("2023-06-20"),
                    imageUri: "https://example.com/images/nodejs.jpg",
                    authorFullName: "Alice Johnson",
                    authorId: 3,
                    authorImageUri: "https://example.com/images/alice_johnson.jpg",
                    isDeleted: false,
                    isHidden: false
                },
                {
                    id: 4,
                    title: "A Guide to GraphQL",
                    categoryId: 102,
                    categoryName: "Backend Development",
                    createdAt: new Date("2023-05-30"),
                    imageUri: "https://example.com/images/graphql.jpg",
                    authorFullName: "Bob Brown",
                    authorId: 4,
                    authorImageUri: "https://example.com/images/bob_brown.jpg",
                    isDeleted: false,
                    isHidden: false
                },
                {
                    id: 5,
                    title: "CSS Grid Layout",
                    categoryId: 103,
                    categoryName: "Frontend Development",
                    createdAt: new Date("2023-04-25"),
                    imageUri: "https://example.com/images/css_grid.jpg",
                    authorFullName: "Charlie Green",
                    authorId: 5,
                    authorImageUri: "https://example.com/images/charlie_green.jpg",
                    isDeleted: false,
                    isHidden: false
                },
                {
                    id: 6,
                    title: "Understanding Docker",
                    categoryId: 104,
                    categoryName: "DevOps",
                    createdAt: new Date("2023-03-18"),
                    imageUri: "https://example.com/images/docker.jpg",
                    authorFullName: "David Lee",
                    authorId: 6,
                    authorImageUri: "https://example.com/images/david_lee.jpg",
                    isDeleted: false,
                    isHidden: false
                },
                {
                    id: 7,
                    title: "Introduction to Kubernetes",
                    categoryId: 104,
                    categoryName: "DevOps",
                    createdAt: new Date("2023-02-10"),
                    imageUri: "https://example.com/images/kubernetes.jpg",
                    authorFullName: "Eva King",
                    authorId: 7,
                    authorImageUri: "https://example.com/images/eva_king.jpg",
                    isDeleted: false,
                    isHidden: false
                },
                {
                    id: 8,
                    title: "Getting Started with Python",
                    categoryId: 105,
                    categoryName: "Programming Languages",
                    createdAt: new Date("2023-01-05"),
                    imageUri: "https://example.com/images/python.jpg",
                    authorFullName: "Frank White",
                    authorId: 8,
                    authorImageUri: "https://example.com/images/frank_white.jpg",
                    isDeleted: false,
                    isHidden: false
                },
                {
                    id: 9,
                    title: "Building REST APIs",
                    categoryId: 102,
                    categoryName: "Backend Development",
                    createdAt: new Date("2022-12-22"),
                    imageUri: "https://example.com/images/rest_api.jpg",
                    authorFullName: "Grace Black",
                    authorId: 9,
                    authorImageUri: "https://example.com/images/grace_black.jpg",
                    isDeleted: false,
                    isHidden: false
                },
                {
                    id: 10,
                    title: "Effective JavaScript Debugging",
                    categoryId: 101,
                    categoryName: "Programming",
                    createdAt: new Date("2022-11-10"),
                    imageUri: "https://example.com/images/javascript_debugging.jpg",
                    authorFullName: "Henry Walker",
                    authorId: 10,
                    authorImageUri: "https://example.com/images/henry_walker.jpg",
                    isDeleted: false,
                    isHidden: false
                }
            ];

            setBlogs(blogs);
        }
        getBlogs();
    }, []);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const author = searchParams.get('author');

    useEffect(() => {
        if (category) setSearchText(category);
        if (author) setSearchText(author);
    }, [category, author])

    useEffect(() => {
        const filteredBlogs = blogs?.filter((blog) => {
            const idMatch = blog.id?.toString().includes(searchText);
            const titleMatch = blog.title?.toLowerCase().includes(searchText.toLowerCase());
            const authorFullNameMatch = blog.authorFullName?.toLowerCase().includes(searchText.toLowerCase());
            const categoryNameMatch = blog.categoryName?.toLowerCase().includes(searchText.toLowerCase());
            return idMatch || titleMatch || authorFullNameMatch || categoryNameMatch;
        });
        setFilteredBlogs(filteredBlogs);
    }, [blogs, searchText]);

    const handleSearch = (e: any) => setSearchText(e.target.value);
    const handleChangePage = (e: any, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (e: any) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };


    const handleDelete = async (blog?: BlogListDto) => {
        if (!blog) return;
        if (blog.isDeleted) {
            toast.error('Blog is already deleted');
            return;
        }
        setOpenAlert(true);
        setAlertText('Are you sure you want to delete this blog?');
    };

    const handleConfirm = async () => {
        toast.dismiss();
        toast.success(`Blog deleted successfully`);
        setOpenAlert(false);

        if (currentBlog) {
            const updatedBlogs = blogs?.map((blog) => {
                if (blog.id === currentBlog.id) {
                    return { ...blog, isDeleted: true };
                }
                return blog;
            });
            setBlogs(updatedBlogs);
        }

        setCurrentBlog(undefined);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid container>
                    <Grid item xs={12} sm={9}>
                        <Typography variant='h4'>Blogs</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Search by ID, Title, Author or Category Name"
                    variant="filled" value={searchText}
                    onChange={handleSearch} size="medium"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <SearchIcon />
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>State</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredBlogs && filteredBlogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell>#{blog.id}</TableCell>
                                    <TableCell>{blog.title} </TableCell>
                                    <TableCell>{blog.authorFullName}</TableCell>

                                    <TableCell>
                                        {blog.isDeleted ? (
                                            <span style={{ color: 'red' }}>Deleted {blog.isDeleted}</span>
                                        ) : blog.isHidden ? (
                                            <span style={{ color: 'orange' }}>Hidden</span>
                                        ) : (
                                            <span style={{ color: 'green' }}>Active</span>
                                        )}
                                    </TableCell>
                                    <TableCell> <CategoryButton id={blog.categoryId} name={blog.categoryName} /> </TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{ borderRadius: 3 }}
                                            variant="outlined" color="primary"
                                            onClick={(event) => handleMenuClick(event, blog)}
                                        >
                                            Actions
                                        </Button>
                                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} >
                                            <MenuItem onClick={() => navigate(`/blog/${currentBlog?.id}`)}>View Blog</MenuItem>
                                            <MenuItem onClick={() => navigate(`/me/authors/${currentBlog?.authorId}`)}>View Author</MenuItem>
                                            <MenuItem sx={{ color: "red" }} onClick={() => handleDelete(currentBlog)}>Delete</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    {filteredBlogs && <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredBlogs.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
                </TableContainer>
            </Grid>
            {openAlert && (
                <DialogComponent
                    title='Caution'
                    open={openAlert}
                    handleClose={() => setOpenAlert(false)}
                    handleConfirm={async () => { handleConfirm() }}
                    text={alertText}
                />
            )}
        </Grid>
    );
};

export default BlogsPage;