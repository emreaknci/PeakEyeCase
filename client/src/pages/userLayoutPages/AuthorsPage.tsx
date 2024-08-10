import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { UserDto } from '../../dtos/users/userDto';
import DialogComponent from '../../components/common/DialogComponent';
import UserService from '../../services/user.service';
import { Role } from '../../models/role';
import AuthService from '../../services/auth.service';

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
            UserService.getByRole(Role.Author).then((response) => {
                setUsers(response.data.data);
            });

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
        if (!currentUser) return;
        toast.dismiss();
        AuthService.assignRole({ userId: currentUser.id, role: Role.Admin }).then(() => {
            setUsers(users?.filter((user) => user.id !== currentUser.id));
            setOpenAlert(false);
            setCurrentUser(undefined);
        });
        setOpenAlert(false);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid container>
                    <Grid item xs={12} sm={9}>  <Typography variant='h4'>Authors</Typography> </Grid>

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

                        {filteredUsers && filteredUsers?.length > 0
                            ? <TableBody>
                                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>#{user.id}</TableCell>
                                        <TableCell>{user.fullName} </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.jobTitle}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="warning"
                                                onClick={() => handleAuth(user)}
                                                style={{ borderRadius: "5rem" }}
                                            >
                                                Revoke Authorization
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody> :
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No author found</TableCell>
                                </TableRow>
                            </TableBody>

                        }


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