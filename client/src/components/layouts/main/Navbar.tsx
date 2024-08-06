import { AppBar, Toolbar, Typography, Button, useTheme, Box, IconButton, InputBase, Switch, Drawer, List, ListItem, ListItemText, useMediaQuery, Container } from '@mui/material';
import React, { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { CustomThemeContext } from '../../../contexts/CustomThemeContext';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../../common/ToggleThemeSwitch';

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
  const themeContext = useContext(CustomThemeContext);
  const [isMediumScreen, setIsMediumScreen] = React.useState(false);
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

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
              {!isMedium && <Box sx={{
                display: 'flex', alignItems: 'center', mr: 2, p: 0.5, width: 200,
                bgcolor: theme.palette.divider, borderRadius: 3,
              }}>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{ ml: 1, flex: 1 }}
                />
                <SearchIcon />
              </Box>
              }
              <ThemeSwitcher />
              {/* <Button color="inherit" component={Link} to="/login">Login</Button> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MediumScreenAppBar isMediumScreen={isMediumScreen} handleDrawerToggle={handleDrawerToggle} />
    </>
  );
};

export default Navbar;
