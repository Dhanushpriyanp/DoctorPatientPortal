import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Import the custom Axios instance
import { Container, Typography, Button, Box, Card, CardContent, CardActions, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext';

const LinkDoctorPatient = () => {
  const { doctorId } = useAuth();
  const [patientId, setPatientId] = useState('');
  const [unlinkedPatients, setUnlinkedPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleSelectFocus = () => {
    setShowPlaceholder(false);
  };

  const handleSelectBlur = () => {
    if (!patientId) {
      setShowPlaceholder(true);
    }
  };

  useEffect(() => {
    if (!doctorId) {
      navigate('/');
      return;
    }

    const fetchUnlinkedPatients = async () => {
      try {
        const response = await axiosInstance.get(`/doctor/${doctorId}/unlinked_patients/`);
        setUnlinkedPatients(response.data);
      } catch (error) {
        toast.error('Error fetching unlinked patients');
        console.error('Error fetching unlinked patients:', error);
      }
    };

    fetchUnlinkedPatients();
  }, [doctorId, navigate]);

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post(`/link/`, {
        doctor_id: doctorId,
        patient_id: patientId,
      });
      toast.success('Doctor and patient linked successfully');
      setUnlinkedPatients(unlinkedPatients.filter(patient => patient.id !== parseInt(patientId)));
    } catch (error) {
      toast.error('Error linking doctor and patient');
      console.error('Error linking doctor and patient:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box mt={5}>
        <Typography color='primary' variant="h4" gutterBottom>Link Patient</Typography>
        <Typography variant="body1" paragraph>
          Please select a patient to link with your account. This allows you to manage their records efficiently.
        </Typography>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel>{showPlaceholder ? 'Select Patient' : ''}</InputLabel>
                <Select
                  value={patientId}
                  onChange={handlePatientIdChange}
                  onFocus={handleSelectFocus}
                  onBlur={handleSelectBlur}
                  required
                >
                  <MenuItem value="" disabled>Select a patient</MenuItem>
                  {unlinkedPatients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {patient.name} (ID: {patient.id})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <CardActions sx={{ justifyContent: 'center', mt: 3 }}>
                <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ fontSize: '1.2rem' }}>
                  {loading ? <CircularProgress size={24} /> : 'Link Patient'}
                </Button>
                <Button component={Link} to="/dashboard" variant="outlined" color="primary" sx={{ fontSize: '1.2rem', ml: 2 }}>
                  Cancel
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default LinkDoctorPatient;
