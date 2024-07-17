import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Card, CardContent, CardActions, Button, CircularProgress } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext';
import axiosInstance from './axiosInstance';

const PDFUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { doctorId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorId) {
      navigate('/');
    }
  }, [doctorId, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("doctor_id", doctorId);

    try {
      const response = await axiosInstance.post(`/pdfs/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('PDF uploaded successfully');
      console.log(response.data);
      setFile(null); // Clear the file input
    } catch (error) {
      toast.error('Error uploading PDF');
      console.error("Error uploading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box mt={5}>
        <Typography color= 'primary' variant="h4" sx={{mb: 3}} gutterBottom>Upload PDF</Typography>
        <Typography variant="body1" paragraph>
          Please upload the necessary medical documents in PDF format. This helps in maintaining accurate records and enhances patient care.
        </Typography>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                type="file"
                onChange={handleFileChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: 'application/pdf' }}
                required
              />
              <CardActions>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Upload PDF'}
                </Button>
                <Button component={Link} to="/dashboard" variant="outlined" color="primary">
                  Cancel
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
        <Box mt={3}>
          <Typography variant="body2" color="textSecondary">
            Note: Ensure that the file does not exceed 50MB in size and is in the correct format. If you encounter any issues, please contact support.
          </Typography>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default PDFUpload;
