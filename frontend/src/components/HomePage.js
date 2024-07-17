import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: '8rem' }}>
    <Typography variant="h2" gutterBottom>
      Welcome to the Doctor Portal
    </Typography>
    <Typography variant="h5" paragraph>
      A seamless platform for doctors and patients to connect efficiently.
    </Typography>
    <Box display="flex" justifyContent="center" mt={2}>
      <Button component={Link} to="/signup" variant="contained" color="primary" sx={{ m: 2, fontSize: '1.05rem', padding: '12px 24px' }}>
        Sign Up
      </Button>
      <Button component={Link} to="/login" variant="outlined" color="primary" sx={{ m: 2, fontSize: '1.05rem', padding: '12px 24px' }}>
        Login
      </Button>
    </Box>
  </Container>
);

export default HomePage;
