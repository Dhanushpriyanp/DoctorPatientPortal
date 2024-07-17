import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, RadioGroup, FormControlLabel, Radio, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext';
import axiosInstance from './axiosInstance';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Signup = () => {
  const { setUserType, setDoctorId, setPatientId, setIsAuthenticated } = useAuth();
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userType = watch("userType", "doctor"); // Default to "doctor"

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = async (data) => {
    const endpoint = data.userType === 'doctor' ? 'doctors' : 'patients';
    try {
      const response = await axiosInstance.post(`/${endpoint}/`, data);
      // Automatically log in the user after successful signup
      setUserType(data.userType);
      setIsAuthenticated(true);
      if (data.userType === "doctor") {
        setDoctorId(response.data.id);
        navigate('/dashboard');
      } else if (data.userType === "patient") {
        setPatientId(response.data.id);
        navigate('/patient-dashboard');
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Try Login: ${error.response.data.detail || error.response.data}`);
      } else {
        toast.error('Network error, please try again');
      }
      console.error('Try login ', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box mt={3}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="userType"
            control={control}
            defaultValue="doctor"
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
                <FormControlLabel value="patient" control={<Radio />} label="Patient" />
              </RadioGroup>
            )}
          />
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                required
                margin="normal"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Enter a valid email address'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                required
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? "text" : "password"}  // Conditional type
                fullWidth
                required
                margin="normal"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          {userType === 'doctor' && (
            <Controller
              name="specialty"
              control={control}
              defaultValue=""
              rules={{ required: 'Specialty is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Specialty"
                  fullWidth
                  required
                  margin="normal"
                  error={!!errors.specialty}
                  helperText={errors.specialty ? errors.specialty.message : ''}
                />
              )}
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2, fontSize: '1rem' }}>
            Sign Up
          </Button>
          <Button component={Link} to="/login" variant="outlined" color="primary" fullWidth sx={{ mb: 2, fontSize: '1rem' }}>
            Already have an account? Login
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Signup;
