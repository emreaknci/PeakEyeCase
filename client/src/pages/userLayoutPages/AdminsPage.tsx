import { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { UserDto } from '../../dtos/users/userDto';
import DialogComponent from '../../components/common/DialogComponent';
import UserService from '../../services/user.service';
import { Role } from '../../models/role';
import AuthService from '../../services/auth.service';
import { AssignRoleDto } from '../../dtos/users/assignRoleDto';
import { AuthContext } from '../../contexts/AuthContext';

const AdminsPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [admins, setAdmins] = useState<UserDto[]>();
    const [filteredAdmins, setFilteredAdmins] = useState(admins);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [currentUser, setCurrentUser] = useState<UserDto>();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState('');


    useEffect(() => {
        const getAdmins = async () => {
            UserService.getByRole(Role.Admin).then((response) => {
                setAdmins(response.data.data);
            });
        }
        getAdmins();
    }, []);

    useEffect(() => {
        const filteredAdmins = admins?.filter((admin) => {
            const emailMatch = admin.email?.toLowerCase().includes(searchText.toLowerCase());
            const idMatch = admin.id?.toString().includes(searchText);
            const fullnameMatch = admin.fullName?.toLowerCase().includes(searchText.toLowerCase());
            const jobTitleMatch = admin.jobTitle?.toLowerCase().includes(searchText.toLowerCase());
            return emailMatch || idMatch || fullnameMatch || jobTitleMatch;
        });
        setFilteredAdmins(filteredAdmins);
    }, [admins, searchText]);

    const handleSearch = (e: any) => setSearchText(e.target.value);
    const handleChangePage = (e: any, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (e: any) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleRevokeAuth = (user: UserDto) => {
        console.log(authContext.currentUserId);
        setOpenAlert(true);

        setCurrentUser(user);
        if(authContext.currentUserId === user.id){
            setAlertText(`Are you sure you want to revoke your own authorization? If you do, your privileges will be revoked and you will be logged out.`);
            return;
        }

        setAlertText(`Are you sure you want to revoke authorization for user ${user?.fullName}?`);
    }

    const handleConfirm = async () => {
        if (!currentUser) return;
        const dto: AssignRoleDto = {
            userId: currentUser.id,
            role: Role.Author
        }

        AuthService.assignRole(dto).then(() => {
            
            if(currentUser.id === authContext.currentUserId){
                authContext.logout();
                return;
            }
            
            setAdmins(admins?.filter(admin => admin.id !== currentUser.id));
            setOpenAlert(false);
        });

    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Grid container>
                    <Grid item xs={12} sm={9}>  <Typography variant='h4'>Admins</Typography> </Grid>
                    <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
                        <Button fullWidth variant="outlined" sx={{ fontWeight: 'bold' }}
                            color="primary" onClick={() => navigate("/me/admins/add-admin")}>
                            Add New Admin
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Search by ID, Full Name, Email or Job Title"
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
                                <TableCell>Job Title</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        {filteredAdmins && filteredAdmins?.length > 0
                            ? <TableBody>
                                {filteredAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>#{user.id}</TableCell>
                                        <TableCell>{user.fullName} </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.jobTitle}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="warning"
                                                onClick={() => handleRevokeAuth(user)}
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
                                    <TableCell colSpan={5} align="center">No admin found</TableCell>
                                </TableRow>
                            </TableBody>
                        }

                    </Table>
                    {filteredAdmins && <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredAdmins.length}
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

export default AdminsPage;