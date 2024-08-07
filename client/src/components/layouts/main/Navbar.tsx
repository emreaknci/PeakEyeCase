import { AppBar, Toolbar, Typography, Button, useTheme, Box, IconButton, InputBase, Switch, Drawer, List, ListItem, ListItemText, useMediaQuery, Container, Menu, MenuItem } from '@mui/material';
import React, { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { CustomThemeContext } from '../../../contexts/CustomThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../../common/ToggleThemeSwitch';
import { AccountCircle } from '@mui/icons-material';

const NavigationButtons = () => (
  <Box sx={{
    display: 'flex', gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  }}>
    <Button component={Link} to="/" color="inherit">Home</Button>
    <Button component={Link} to="/blog" color="inherit">Blog</Button>
    <Button component={Link} to="/contact" color="inherit">Contact</Button>
  </Box>
);

const MediumScreenAppBar = ({ isMediumScreen, handleDrawerToggle }: { isMediumScreen: boolean, handleDrawerToggle: () => void }) => (
  <Drawer
    anchor="left"
    open={isMediumScreen}
    onClose={handleDrawerToggle}
  >
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
      <List>
        {['Home', 'Blog', 'Contact'].map((text) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem button>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  </Drawer>
);

const Navbar = () => {
  const navigate=useNavigate();

  const themeContext = useContext(CustomThemeContext);
  const [isMediumScreen, setIsMediumScreen] = React.useState(false);
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setIsMediumScreen(!isMediumScreen);
  };

  return (
    <>
      <AppBar variant='outlined' position="static" sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        border: 'none',
      }}>
        <Container>
          <Toolbar style={{ padding: '0' }}>
            {isMedium && (
              <IconButton edge="start" color="inherit"
                aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <img src="logo.png" alt="logo" style={{ height: 40, marginRight: 8 }} />
              <span>PeakEye <b> Blog</b></span>
            </Typography>

            {!isMedium && <NavigationButtons />}

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 10 }}>
              {!isMedium && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mr: 2,
                    p: 0.5,
                    width: 200,
                    bgcolor: theme.palette.divider,
                    borderRadius: 3,
                  }}
                >
                  <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    sx={{ ml: 1, flex: 1 }}
                  />
                  <SearchIcon />
                </Box>
              )}
              <ThemeSwitcher />
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{navigate("/sign-in")}}>Sign In</MenuItem>
                <MenuItem onClick={()=>{navigate("/sign-up")}}>Sign Up</MenuItem>
                <MenuItem onClick={handleClose}>Logout </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MediumScreenAppBar isMediumScreen={isMediumScreen} handleDrawerToggle={handleDrawerToggle} />
    </>
  );
};

export default Navbar;
