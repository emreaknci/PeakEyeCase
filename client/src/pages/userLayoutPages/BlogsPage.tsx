import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';

import { useNavigate, useSearchParams } from 'react-router-dom';
import DialogComponent from '../../components/common/DialogComponent';
import { BlogListDto } from '../../dtos/blogs/blogListDto';
import CategoryButton from '../../components/layouts/main/CategoryButton';
import BlogService from '../../services/blog.service';

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

            BlogService.getAll().then((response) => {
                setBlogs(response.data.data);
            })
        

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