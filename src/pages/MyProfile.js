import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = ({ userEmail, isLoggedIn }) => {
  const [savedData, setSavedData] = useState([]);
  const [savedName, setSavedName] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchExerciseData();
  }, [userEmail]);

  const fetchExerciseData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/exercises');
      const response1 = await axios.get('http://localhost:3000/users');
      
      const filteredData = response.data.filter((data) => data.email === userEmail);
      const filteredData1 = response1.data.filter((data) => data.email === userEmail);

      setSavedData(filteredData);
      setSavedName(filteredData1[0].fname + ' ' + filteredData1[0].lname)
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExercise = async (exerciseId) => {
    try {
      await axios.delete(`http://localhost:3000/exercise/delete/${exerciseId}`);
      toast("Exercise deleted successfully!");
      fetchExerciseData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (exerciseData) => {
    navigate('/edit-exercise', { state: { exerciseData } });
  };

  if(!isLoggedIn){
    return (
      <Box id="app-wrapper" sx={{ display: 'flex', alignItems: 'center', height: '80vh' }}>
        <Typography>You are not logged in</Typography>
      </Box>
    );
  }

  return (
     <Box id="app-wrapper" sx={{ alignItems: 'center'}}>
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="35px">
        {typeof savedName === 'object' ? JSON.stringify(savedName) : `${savedName}'s exercises`}
      </Typography>
      <TableContainer sx={{ maxWidth: '1500px' }} style={{ height: '90%' }}>
        <Box sx={{ overflow: 'auto' }}>
          <Table sx={{ border: '1px solid #ccc' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>User Name</TableCell>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Exercise Name</TableCell>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Exercise Description</TableCell>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Body Part</TableCell>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Exercise Type</TableCell>
                <TableCell sx={{ border: '1px solid #ccc', fontSize: '16px', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {savedData.map((data) => (
                <TableRow key={data._id}>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{savedName}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{data.name}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{data.description}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{data.bodyPart}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{data.exerciseType}</TableCell>
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
                      onClick={() => deleteExercise(data._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      className="add-btn"
                      sx={{
                        bgcolor: '#2ECC71',
                        color: '#fff',
                        textTransform: 'none',
                        minWidth: '80px',
                        height: '40px',
                        fontSize: { lg: '16px', xs: '12px' },
                        marginBottom: '10px',
                      }}
                      onClick={() => handleEdit(data)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        <ToastContainer/>
      </TableContainer>
    </Box>
  );
};

export default MyProfile;