import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [doctorId, setDoctorId] = useState(() => localStorage.getItem('doctorId'));
  const [userType, setUserType] = useState(() => localStorage.getItem('userType'));
  const [patientId, setPatientId] = useState(() => localStorage.getItem('patientId'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    localStorage.setItem('doctorId', doctorId);
  }, [doctorId]);

  useEffect(() => {
    localStorage.setItem('userType', userType);
  }, [userType]);

  useEffect(() => {
    localStorage.setItem('patientId', patientId);
  }, [patientId]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ userType, setUserType, doctorId, setDoctorId, patientId, setPatientId, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
