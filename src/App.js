import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import AddExercise from './pages/AddExercise';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import MyProfile from './pages/MyProfile';
import EditExercise from './pages/EditExercise';
import AdminPanel from './pages/AdminPanel';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');

  const handleLogin = (email, userType) => {
    setIsLoggedIn(true);
    setEmail(email);
    if (userType.userType === 'Admin') {
      setUserType(true);
    } else {
      setUserType(false);
    }
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', email);
    localStorage.setItem('userType', userType.userType);};

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setUserType(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const storedEmail = localStorage.getItem('email');
    const storedUserType = localStorage.getItem('userType');
    let temp = false;
    if(storedUserType === 'Admin'){
      temp = true;
    }
    if (loggedIn && storedEmail && storedUserType) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
      setUserType(temp);
      }
  }, []);

  return (
    <Box id="app-wrapper" width="400px" sx={{ width: { x1: '1488px' } }} m="auto" style={{ marginBottom: '100px' }}>
      <Navbar isLoggedIn={isLoggedIn} isAdmin={userType} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/add-exercise" element={<AddExercise userEmail={email} isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn handleLogin={handleLogin} />} />
        <Route path="/my-profile" element={<MyProfile userEmail={email} isLoggedIn={isLoggedIn} />} />
        <Route path="/edit-exercise" element={<EditExercise isLoggedIn={isLoggedIn} />} />
        <Route path="/admin-panel" element={<AdminPanel userEmail={email} />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
