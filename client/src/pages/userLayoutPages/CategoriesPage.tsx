import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Category } from '../../models/category';
import CustomTextFieldComponent from '../../components/common/CustomTextFieldComponent';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const NewCategory = ({ categories, setCategories }: { categories: Category[], setCategories: any }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitted(true);

      toast.success('Category added successfully');
      const category: Category = {
        id: categories ? categories.length + 1 : 1,
        name: values.name
      }
      setCategories([...categories!, category]);

      formik.resetForm();
    },
  });

  return (
    <Paper style={{ padding: '1rem' }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Grid container >
              <Grid item xs={12} sm={9}>
                <Typography variant='h4'>New Category</Typography>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
                <Button fullWidth variant="outlined" sx={{ fontWeight: 'bold' }}
                  color="primary" type="submit" onClick={() => setSubmitted(true)} >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <CustomTextFieldComponent formik={formik} fieldName='name' label="Category Name" />
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
};

const CategoriesPage = () => {
  const [addCategory, setAddCategory] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>();
  const [filteredCategories, setFilteredCategories] = useState<Category[]>();
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const getCategories = async () => {
      const users: Category[] = [
        { id: 1, name: 'Technology' },
        { id: 2, name: 'Science' },
        { id: 3, name: 'Health' },
        { id: 4, name: 'Business' },
        { id: 5, name: 'Entertainment' },
        { id: 6, name: 'Sports' },
        { id: 7, name: 'Politics' },
        { id: 8, name: 'Lifestyle' },
        { id: 9, name: 'Fashion' },
        { id: 10, name: 'Travel' }
      ];

      setCategories(users);
    }
    getCategories();
  }, []);

  useEffect(() => {
    const filteredCategories = categories?.filter((category) => {
      const nameMatch = category.name?.toLowerCase().includes(searchText.toLowerCase());
      return nameMatch;
    });
    setFilteredCategories(filteredCategories);
    setAddCategory(false);
  }, [categories, searchText]);

  const handleSearch = (e: any) => setSearchText(e.target.value);
  const handleChangePage = (e: any, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container spacing={3} >
      <Grid item xs={12} >
        <Grid container>
          <Grid item xs={12} sm={9}>  <Typography variant='h4'>Categories</Typography> </Grid>
          <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
            <Button fullWidth variant="outlined" sx={{ fontWeight: 'bold' }}
              color="primary" onClick={() => { setAddCategory(p => !p) }}>
              Add New Category
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Search by Name"
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

      {addCategory && <Grid item sm={12} lg={6}>
        <NewCategory categories={categories!} setCategories={setCategories} />
      </Grid>}

      <Grid item sm={12} lg={addCategory ? 6 : 12} >
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredCategories && filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>#{category.id}</TableCell>
                      <TableCell>{category.name} </TableCell>
                      <TableCell>
                        <Button variant="outlined" color="inherit"
                          onClick={() => navigate(`/me/blogs?category=${category.name}`)}
                          style={{ borderRadius: "5rem" }}
                        >
                          View Blogs
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
              {categories && <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />}
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default CategoriesPage;