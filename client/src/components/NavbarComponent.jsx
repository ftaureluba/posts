import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const pages = [
  { title: 'Historial', path: '/historial' },
  // Add more pages as needed
];
const settings = ['Logout'];

function NavbarComponent() {
    const {isLoggedIn, logout} = React.useContext(AuthContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    /*const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };*/
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenuItemClick = (setting) => {
    if (setting === 'Logout') {
      logout(); // Call the logout function
    }
    handleCloseUserMenu();
  };
  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to = "/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GymTracker
          </Typography>

          
          
          {isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={ {display: 'flex' /*{ flexGrow: 1, display: { xs: 'none', md: 'flex' } */}}>
              {pages.map((page) => (
                  <Button
                    key={page.title}
                    onClick={() => handleNavigate(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.title}
              </Button>
            ))}
             </Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorElNav={anchorElNav}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (/*
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>*/
                  <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>)
          
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarComponent;