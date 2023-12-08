// Navbar component
import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

import Logo from '../assets/images/Logo.png';

const Navbar = ({ isLoggedIn, handleLogout, isAdmin }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      px="20px"
      backgroundColor="#ffecdc"
      sx={{
        gap: { sm: '122px', xs: '40px' },
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px',
        justifyContent: 'none'
      }}
    >
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          style={{
            width: '48px',
            height: '48px',
            margin: '0 20px'
          }}
        />
      </Link>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#3A1212',
            borderBottom: '3px solid #FF2625'
          }}
        >
          Home
        </Link>
        {isLoggedIn && (
          <>
            <Link
              to="/add-exercise"
              style={{
                textDecoration: 'none',
                color: '#3A1212'
              }}
            >
              Add Exercises
            </Link>
            <Link
              to="/my-profile"
              style={{
                textDecoration: 'none',
                color: '#3A1212',
                textAlign: 'right' // Dodany styl textAlign: 'right' dla większych ekranów
              }}
            >
              My Exercises
            </Link>
            {isAdmin && (
              <Link
                to="/admin-panel"
                style={{
                  textDecoration: 'none',
                  color: '#3A1212'
                }}
              >
                Admin Panel
              </Link>
            )}
            <Link
              to="/"
              onClick={handleLogout}
              style={{
                textDecoration: 'none',
                color: '#3A1212',
                textAlign: 'right' // Dodany styl textAlign: 'right' dla większych ekranów
              }}
            >
              Logout
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link
              to="/register"
              style={{
                textDecoration: 'none',
                color: '#3A1212'
              }}
            >
              Register
            </Link>
            <Link
              to="/sign-in"
              style={{
                textDecoration: 'none',
                color: '#3A1212',
                textAlign: 'right' // Dodany styl textAlign: 'right' dla większych ekranów
              }}
            >
              Sign In
            </Link>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
