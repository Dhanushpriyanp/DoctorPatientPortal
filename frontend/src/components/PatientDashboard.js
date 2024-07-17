import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tab, Tabs, Grid, Card, CardContent, Alert } from '@mui/material';
import { useAuth } from '../AuthContext';
import axiosInstance from './axiosInstance';

const DoctorCard = ({ doctor }) => (
  <Card sx={{ minWidth: 275, mb: 2 }}>
    <CardContent>
      <Typography variant="h5" component="div">{doctor.name}</Typography>
      <Typography variant="body1" color='grey'>
        <Typography component="span" color="primary">Specialty:</Typography> {doctor.specialty}
      </Typography>
    </CardContent>
  </Card>
);

const PatientDashboard = () => {
  const [linkedDoctors, setLinkedDoctors] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [value, setValue] = useState(0); // State to manage active tab
  const { patientId } = useAuth();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const linkedResponse = await axiosInstance.get(`/patient/${patientId}/doctors/`);
        setLinkedDoctors(linkedResponse.data);
        
        const availableResponse = await axiosInstance.get(`/get-doctors/`);
        setAvailableDoctors(availableResponse.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    
    fetchDoctors();
  }, [patientId]);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={5} mb={2}>
        <Typography color='primary' variant="h4" gutterBottom>Patient Dashboard</Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Welcome to your Dashboard!
      </Typography>
      <Typography variant="body1" paragraph>
        This is your personal dashboard where you can browse the available doctors and linked doctors. Use the options below to get started.
      </Typography>

      <Box mt={5}>
        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="doctor tabs">
          <Tab label="Available Doctors" />
          <Tab label="Linked Doctors" />
        </Tabs>
        
        {/* Available Doctors Tab */}
        {value === 0 && (
          <Box mt={2}>
            <Grid container spacing={2}>
              {availableDoctors.length === 0 ? (
                <Typography>No available doctors.</Typography>
              ) : (
                availableDoctors.map(doctor => (
                  <Grid item xs={12} sm={6} key={doctor.id}>
                    <DoctorCard doctor={doctor} />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        )}

        {/* Linked Doctors Tab */}
        {value === 1 && (
          <Box mt={2}>
            <Grid container spacing={2}>
              {linkedDoctors.length === 0 ? (
                <Alert severity="info">No doctors linked. If any doctor linked your profile then it will display here</Alert>
              ) : (
                linkedDoctors.map(doctor => (
                  <Grid item xs={12} sm={6} key={doctor.id}>
                    <DoctorCard doctor={doctor} />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PatientDashboard;
