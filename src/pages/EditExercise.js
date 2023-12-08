import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditExercise = ({isLoggedIn}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [exerciseData, setExerciseData] = useState({
    name: '',
    description: '',
    bodyPart: '',
    exerciseType: '',
  });

  useEffect(() => {
    const passedExerciseData = location.state.exerciseData;
    if (passedExerciseData) {
      setExerciseData(passedExerciseData);
    }
  }, [location.state.exerciseData]);

  const handleInputChange = (event) => {
    setExerciseData({
      ...exerciseData,
      [event.target.name]: event.target.value,
    });
  };

  const updateExercise = async () => {
    if (exerciseData.name && exerciseData.description && exerciseData.bodyPart && exerciseData.exerciseType) {
      const exerciseId = exerciseData._id;
      console.log(exerciseId);
      try {
        await axios.put(`http://localhost:3000/update-exercise/${exerciseId}`, exerciseData);
        navigate('/my-profile');
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
          Edit your exercise!
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
                    placeholder="Exercise body part"
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
                    placeholder="Exercise type"
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
          onClick={updateExercise}
        >
          Save
        </Button>
      </Stack>
      <ToastContainer/>
    </Box>
  );
};

export default EditExercise;
