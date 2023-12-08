import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddExercise = ({ userEmail, isLoggedIn }) => {
  
  const [exerciseData, setExerciseData] = useState({
    name: '',
    description: '',
    bodyPart: '',
    exerciseType: '',
    email: userEmail,
  });

  const handleInputChange = (event) => {
    setExerciseData({
      ...exerciseData,
      [event.target.name]: event.target.value,
    });
  };

  const addExercise = async () => {
    if (exerciseData.name && exerciseData.description && exerciseData.bodyPart && exerciseData.exerciseType) {
      try {
        await axios.post('http://localhost:3000/exercise/add', exerciseData);
        toast("Exercise added successfully!");
        setExerciseData({
          name: '',
          description: '',
          bodyPart: '',
          exerciseType: '',
          email: userEmail,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      toast("Please fill in all fields!");
    }
  };

  if(!isLoggedIn){
    return (
      <Box id="app-wrapper" sx={{ display: 'flex', alignItems: 'center', height: '80vh' }}>
        <Typography>You are not logged in</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
        <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
          Add your own exercise!
        </Typography>
        <TableContainer sx={{ maxWidth: '550px' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    height="76px"
                    sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: '100%', backgroundColor: '#fff' }}
                    name="name"
                    value={exerciseData.name}
                    onChange={handleInputChange}
                    placeholder="Exercise name"
                    type="text"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    height="76px"
                    sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: '100%', backgroundColor: '#fff' }}
                    name="description"
                    value={exerciseData.description}
                    onChange={handleInputChange}
                    placeholder="Exercise description"
                    type="text"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    height="76px"
                    sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: '100%', backgroundColor: '#fff' }}
                    name="bodyPart"
                    value={exerciseData.bodyPart}
                    onChange={handleInputChange}
                    placeholder="Body part"
                    type="text"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    height="76px"
                    sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: '100%', backgroundColor: '#fff' }}
                    name="exerciseType"
                    value={exerciseData.exerciseType}
                    onChange={handleInputChange}
                    placeholder="Exercise Type"
                    type="text"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          className="add-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '173px', xs: '80px' },
            height: '56px',
            bottom: '25px',
            top: '25px',
            right: '0px',
            fontSize: { lg: '20px', xs: '14px' },
          }}
          onClick={addExercise}
        >
          Add
        </Button>
        <ToastContainer/>
      </Stack>
    </Box>
  );
};

export default AddExercise;
