import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import PDFUpload from './components/pdfupload';
import LinkDoctorPatient from './components/LinkDoctorPatient';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import LinkedPatients from './components/LinkedPatients';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider, useAuth } from './AuthContext';
import NavigationBar from './components/NavigationBar';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  </AuthProvider>
);

const AppRoutes = () => {
  const { userType, isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <NavigationBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isAuthenticated && userType === 'doctor' && (
          <>
            <Route path="/dashboard" element={<DoctorDashboard />} />
            <Route path="/upload" element={<PDFUpload />} />
            <Route path="/link" element={<LinkDoctorPatient />} />
            <Route path="/linked-patients" element={<LinkedPatients />} />
          </>
        )}
        {isAuthenticated && userType === 'patient' && (
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
