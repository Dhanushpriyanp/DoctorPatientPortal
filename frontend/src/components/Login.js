import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, RadioGroup, FormControlLabel, Radio, Typography, Box, Alert, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from './axiosInstance';

const Login = () => {
  const { setUserType, setDoctorId, setPatientId, setIsAuthenticated } = useAuth();
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {

      const response = await axiosInstance.post(`/login/`, data);
      setUserType(data.userType);
      setIsAuthenticated(true);

      if (data.userType === "doctor") {
        setDoctorId(response.data.user_id);
        navigate('/dashboard');
      } else if (data.userType === "patient") {
        setPatientId(response.data.user_id);
        navigate('/patient-dashboard');
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = typeof error.response.data.detail === 'string'
          ? error.response.data.detail
          : JSON.stringify(error.response.data.detail);
        setError(errorMessage);
      } else {
        setError("Network error, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{
      py:3}}>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Login</Typography>
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
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                required
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2, fontSize: '1rem' }}>
            Login
          </Button>
          <Button component={Link} to="/signup" variant="outlined" color="primary" fullWidth sx={{ mb: 2, fontSize: '1rem' }}>
            Don't have an account? Signup
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </Container>
  );
};

export default Login;
