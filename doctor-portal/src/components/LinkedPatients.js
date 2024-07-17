import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, List, ListItem, ListItemText, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext';
import axiosInstance from './axiosInstance';

const LinkedPatients = () => {
  const [linkedPatients, setLinkedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { doctorId } = useAuth();

  useEffect(() => {
    const fetchLinkedPatients = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/doctor/${doctorId}/patients/`);
        setLinkedPatients(response.data);
      } catch (error) {
        toast.error('Error fetching linked patients');
        console.error("Error fetching linked patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkedPatients();
  }, [doctorId]);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box mt={5}>
        <Typography color='primary' variant="h4" gutterBottom>Linked Patients</Typography>
        <Card variant="outlined" sx={{ boxShadow: 2 }}>
          <CardContent>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
              </Box>
            ) : linkedPatients.length === 0 ? (
              <Alert severity="info">No patients linked. Please link some patients to manage their records.</Alert>
            ) : (
              <List>
                {linkedPatients.map((patient) => (
                  <ListItem key={patient.id}>
                  <ListItemText
                  primary={<Typography fontSize={20}>{`Patient Name: ${patient.name}`}</Typography>}
                  secondary={<Typography variant="body1" color="textSecondary">{`ID: ${patient.id}`}</Typography>}
                />
              </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
        <Box mt={2}>
          <Button component={Link} to="/dashboard" variant="outlined" color="primary" sx={{ mr: 2 ,fontSize: '1rem'}}>
            Back to Dashboard
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default LinkedPatients;
