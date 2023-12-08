import React from 'react';
import { Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo-1.png';

const Footer = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px="20px"
      py="24px"
      bgcolor="#f9dcc4"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      zIndex="999"
    >
      <img src={Logo} alt="logo" width="200px" height="40px" />
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Made by TNBM
      </Typography>
    </Stack>
  );
};

export default Footer;
