import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Menu, MenuItem, SwipeableDrawer, Tooltip, useMediaQuery } from '@mui/material';
import { useContext, useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ThemeSwitcher from '../../common/ToggleThemeSwitch';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CommentIcon from '@mui/icons-material/Comment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CategoryIcon from '@mui/icons-material/Category';
import { AuthContext } from '../../../contexts/AuthContext';
import LockIcon from '@mui/icons-material/Lock';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const userIconMap = [
  { name: 'My Profile', icon: <AccountCircle />, link: '' },
  { name: 'My Blogs', icon: <BorderColorIcon />, link: 'my-blogs' },
  { name: 'My Comments', icon: <CommentIcon />, link: 'my-comments' },
  { name: 'Settings', icon: <LockIcon />, link: 'change-password' },

];

const adminIconMap = [
  // { name: 'Dashboard', icon: <DashboardIcon />, link: 'dashboard' },
  { name: 'Admins', icon: <AdminPanelSettingsIcon />, link: 'admins' },
  { name: 'Authors', icon: <SupervisorAccountIcon />, link: 'authors' },
  { name: 'Blogs', icon: <BorderColorIcon />, link: 'blogs' },
  { name: 'Comments', icon: <CommentIcon />, link: 'comments' },
  { name: 'Categories', icon: <CategoryIcon />, link: 'categories' },
  { name: 'Live Support', icon: <LiveHelpIcon />, link: 'live-support' },
];

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleMenuClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navigateTo = (page: string) => {
    navigate(page);
    handleDrawerClose();
  }

  const handleLogout = () => {
    authContext.logout();
    handleMenuClose();
    navigate("/");
    toast.success("Logged out successfully.");
  }

  const largeScreenDrawer = () => {

    return (
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Divider />
        {authContext.isAdmin && <List>
          {adminIconMap.map((item) => {
            return (
              <ListItem onClick={() => navigateTo(item.link)} key={item.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          }
          )}
        </List>}
        <Divider />
        <List>
          {userIconMap.map((item) => {
            return (
              <ListItem onClick={() => navigateTo(item.link)} key={item.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                  <ListItemIcon
                    sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    )
  }

  const smallScreenDrawer = () => {
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
      <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={open} onOpen={handleDrawerOpen} onClose={handleDrawerClose} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>

            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {authContext.isAdmin && <List>
          {adminIconMap.map((item) => {
            return (
              <ListItem onClick={() => navigateTo(item.link)} key={item.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          }
          )}
        </List>}
        <Divider />
        <List>
          {userIconMap.map((item) => {
            return (
              <ListItem onClick={() => navigateTo(item.link)} key={item.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          }
          )}
        </List>
      </SwipeableDrawer >
    )
  }

  return (
    <>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => { open ? handleDrawerClose() : handleDrawerOpen() }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={() => { navigate("/") }}
            sx={{ cursor: "pointer" }}
            variant="h6" noWrap component="div">
            PeakEye
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <ThemeSwitcher />
            <Tooltip title={""}>
              <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                <AccountCircle fontSize='large' style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigateTo("/")}>Go home</MenuItem>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Menu>
          </div>

        </Toolbar>
      </AppBar>


      {isSmallScreen ? smallScreenDrawer() : largeScreenDrawer()}
    </>
  );
}

export default Navbar;