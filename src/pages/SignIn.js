import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import axios from 'axios';

const SignIn = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login-user', {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.status === 'ok') {
        handleLogin(email, userType);
        navigate('/');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserType = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/getUserType/${email}`);
      setUserType(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (email) {
      getUserType(email);
    }
  }, [email]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Stack spacing={2} p={4} maxWidth="400px" width="100%" sx={{ backgroundColor: '#fff', borderRadius: '8px' }}>
        <Typography variant="h5" textAlign="center" fontWeight={700}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            size="small"
            label="Email address"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            variant="outlined"
            size="small"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
          <Button
            className="add-btn"
            sx={{
              bgcolor: '#FF2625',
              color: '#fff',
              textTransform: 'none',
              width: '100%',
              height: '40px',
              fontSize: { lg: '20px', xs: '14px' },
              marginBottom: '10px',
            }}
            type="submit"
            variant="contained"
            fullWidth
          >
            SIGN IN
          </Button>
        </form>
        <Typography variant="body2" textAlign="center">
          Don't have an account? <Link to="/register" style={{ textDecoration: "none" }}>Register!</Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default SignIn;
