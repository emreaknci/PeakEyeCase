import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { UserDto } from '../../dtos/users/userDto';
import DialogComponent from '../../components/common/DialogComponent';

const AuthorsPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserDto[]>();
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [currentUser, setCurrentUser] = useState<UserDto>();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState('');


    useEffect(() => {
        const getUsers = async () => {
            const users: UserDto[] = [
                { id: 1, fullName: 'John Doe', email: 'john@doe.com', jobTitle: 'Admin' },
                { id: 2, fullName: 'Jane Doe', email: 'jane@doe.com', jobTitle: 'Admin' },
                { id: 3, fullName: 'John Smith', email: 'john@smith.com', jobTitle: 'Admin' },
                { id: 4, fullName: 'Alice Johnson', email: 'alice@johnson.com', jobTitle: 'Admin' },
                { id: 5, fullName: 'Bob Brown', email: 'bob@brown.com', jobTitle: 'Admin' },
                { id: 6, fullName: 'Charlie Davis', email: 'charlie@davis.com', jobTitle: 'Admin' },
                { id: 7, fullName: 'Diana Evans', email: 'diana@evans.com', jobTitle: 'Admin' },
                { id: 8, fullName: 'Evan Fox', email: 'evan@fox.com', jobTitle: 'Admin' },
                { id: 9, fullName: 'Fiona Green', email: 'fiona@green.com', jobTitle: 'Admin' },
                { id: 10, fullName: 'George Harris', email: 'george@harris.com', jobTitle: 'Admin' }
            ];

            setUsers(users);
        }
        getUsers();
    }, []);

    useEffect(() => {
        const filteredUsers = users?.filter((admin) => {
            const emailMatch = admin.email?.toLowerCase().includes(searchText.toLowerCase());
            const idMatch = admin.id?.toString().includes(searchText);
            const fullnameMatch = admin.fullName?.toLowerCase().includes(searchText.toLowerCase());
            return emailMatch || idMatch || fullnameMatch;
        });
        setFilteredUsers(filteredUsers);
    }, [users, searchText]);

    const handleSearch = (e: any) => setSearchText(e.target.value);
    const handleChangePage = (e: any, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (e: any) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleAuth = (user: UserDto) => {
        setOpenAlert(true);
        setAlertText(`Are you sure you want to authorize ${user?.fullName}?`);
        setCurrentUser(user);
    }

    const handleConfirm = async () => {
        toast.dismiss();
        toast.success(`Authorization granted for user ${currentUser?.fullName}`);
        setOpenAlert(false);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid container>
                    <Grid item xs={12} sm={9}>  <Typography variant='h4'>Users</Typography> </Grid>

                </Grid>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Search by ID, Full Name or Email"
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
                                <TableCell>Full Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredUsers && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>#{user.id}</TableCell>
                                    <TableCell>{user.fullName} </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="inherit"
                                            onClick={() => navigate(`/me/authors/${user.id}`)}
                                            style={{ borderRadius: "5rem" }}
                                        >
                                            View Profile
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="success"
                                            onClick={() => handleAuth(user)}
                                            style={{ borderRadius: "5rem" }}
                                        >
                                            Authorize
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    {filteredUsers && <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredUsers.length}
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
                    handleConfirm={async () => await handleConfirm()}
                    text={alertText}
                />
            )}
        </Grid>
    );
};

export default AuthorsPage;