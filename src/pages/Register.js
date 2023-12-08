import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, Button, Radio } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User');
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prosta walidacja
    if (!fname || !lname || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Walidacja adresu e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Walidacja minimalnej długości hasła
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (userType === 'Admin' && secretKey !== 'DYSZAK') {
      alert('Invalid Admin');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/register', {
          fname,
          lname,
          email,
          password,
          userType,
        });

        if (response.data.status === 'ok') {
          navigate('/sign-in');
        } else {
          alert('Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box className="auth-wrapper" display="flex" justifyContent="center" alignItems="center" height="70vh">
      <Box maxWidth="400px" width="100%" bgcolor="#fff" borderRadius="8px" p={4}>
        <Typography variant="h5" fontWeight={700} textAlign="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mt={2}>
            <Stack direction="row" alignItems="center">
              <Typography fontWeight={700}>Register As</Typography>
              <Radio
                value="User"
                checked={userType === 'User'}
                onChange={(e) => setUserType(e.target.value)}
                size="small"
              />
              User
              <Radio
                value="Admin"
                checked={userType === 'Admin'}
                onChange={(e) => setUserType(e.target.value)}
                size="small"
              />
              Admin
            </Stack>
            {userType === 'Admin' && (
              <TextField
                variant="outlined"
                size="small"
                label="Secret Key"
                fullWidth
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            )}
            <TextField
              variant="outlined"
              size="small"
              label="First name"
              fullWidth
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Last name"
              fullWidth
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Email address"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </Stack>
          <Typography variant="body2" textAlign="center" mt={2}>
            Already registered? <Link to="/sign-in" style={{ textDecoration: 'none' }}>Sign In!</Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
}
