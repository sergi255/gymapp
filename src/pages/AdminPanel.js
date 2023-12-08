import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = ({ userEmail }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    fetchUserType();
  }, [userEmail]);

  const fetchUserType = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getUserType/${userEmail}`);
      const { userType } = response.data;
      setIsAdmin(userType === 'Admin');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUserData();
    }
  }, [isAdmin]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      const filteredData = response.data.filter((data) => data.email !== userEmail);
      setSavedData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/user/delete/${userId}`);
      fetchUserData();
      toast('User deleted successfully!');
    } catch (error) {
      toast('Error deleting user!');
      console.error(error);
    }
  };

  if (!isAdmin) {
    return (
      <Box id="app-wrapper" sx={{ display: 'flex', alignItems: 'center', height: '80vh' }}>
        <Typography>Insufficient permissions</Typography>
      </Box>
    );
  }

  return (
    <Box id="app-wrapper" sx={{ alignItems: 'center' }}>
      <TableContainer sx={{ maxWidth: '1500px', height: '80vh' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>User Type</TableCell>
              <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedData.map((data) => (
              <TableRow key={data._id}>
                <TableCell sx={{ border: '1px solid #ccc' }}>{data.fname}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{data.lname}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{data.email}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{data.userType}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>
                  <Button
                    variant="outlined"
                    className="add-btn"
                    sx={{
                      bgcolor: '#FF2625',
                      color: '#fff',
                      textTransform: 'none',
                      minWidth: '80px',
                      height: '40px',
                      fontSize: { lg: '16px', xs: '12px' },
                      marginBottom: '10px',
                      marginRight: '10px',
                    }}
                    onClick={() => deleteUser(data._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Box>
  );
};

export default AdminPanel;
