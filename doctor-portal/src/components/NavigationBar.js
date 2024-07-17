import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useMediaQuery, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LinkIcon from '@mui/icons-material/Link';
import PatientsIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import logo from './assets/logo.jpeg'; // Import your logo

const NavigationBar = ({ isAuthenticated, onLogout }) => {
  const { userType } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        width: 250,
        backgroundColor: '#f0f0f0',
        height: '100%',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{
        py: 1,
        backgroundColor: 'primary.main',
        color: 'white',
      }}>
        <Typography
          variant="h6"
        >
          DocPortal
        </Typography>
        <IconButton onClick={handleDrawerToggle} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {!isAuthenticated && (
          <>
            <ListItem button component={Link} to="/login" sx={{ padding: 2 }}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/signup" sx={{ padding: 2 }}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Signup" />
            </ListItem>
          </>
        )}
        {isAuthenticated && userType === 'doctor' && (
          <>
            <ListItem button component={Link} to="/dashboard" sx={{ padding: 2 }}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/upload" sx={{ padding: 2 }}>
              <ListItemIcon>
                <UploadFileIcon />
              </ListItemIcon>
              <ListItemText primary="Upload PDF" />
            </ListItem>
            <ListItem button component={Link} to="/link" sx={{ padding: 2 }}>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Link Patients" />
            </ListItem>
            <ListItem button component={Link} to="/linked-patients" sx={{ padding: 2 }}>
              <ListItemIcon>
                <PatientsIcon />
              </ListItemIcon>
              <ListItemText primary="Linked Patients" />
            </ListItem>
          </>
        )}
        {isAuthenticated && userType === 'patient' && (
          <ListItem button component={Link} to="/patient-dashboard" sx={{ padding: 2 }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Patient Dashboard" />
          </ListItem>
        )}
        {isAuthenticated && (
          <ListItem button onClick={handleLogout} sx={{ padding: 2 }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="DocPortal Logo" style={{ width: '31px', marginRight: '10px' }} />
            <Typography variant="h5" py={2.5} p={1}>
              DocPortal
            </Typography>
          </Box>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {!isAuthenticated && (
                <>
                  <Button color="inherit" component={Link} to="/login" sx={{ fontSize: '1rem' }}>
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/signup" sx={{ fontSize: '1rem' }}>
                    Signup
                  </Button>
                </>
              )}
              {isAuthenticated && userType === 'doctor' && (
                <>
                  <Button color="inherit" component={Link} to="/dashboard" sx={{ fontSize: '1rem' }}>
                    Dashboard
                  </Button>
                  <Button color="inherit" component={Link} to="/upload" sx={{ fontSize: '1rem' }}>
                    Upload PDF
                  </Button>
                  <Button color="inherit" component={Link} to="/link" sx={{ fontSize: '1rem' }}>
                    Link Patients
                  </Button>
                  <Button color="inherit" component={Link} to="/linked-patients" sx={{ fontSize: '1rem' }}>
                    Linked Patients
                  </Button>
                </>
              )}
              {isAuthenticated && userType === 'patient' && (
                <Button color="inherit" component={Link} to="/patient-dashboard" sx={{ fontSize: '1rem' }}>
                  Patient Dashboard
                </Button>
              )}
              {isAuthenticated && (
                <Button color="inherit" onClick={handleLogout} sx={{ fontSize: '1rem' }}>
                  Logout
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default NavigationBar;
