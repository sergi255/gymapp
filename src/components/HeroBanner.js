import React from 'react';
import {Box, Typography, Button} from '@mui/material';
const HeroBanner = () => {
  return (
    <Box sx=
    {{
        mt:{lg:'212px', sx:'70px'},
        ml:{sm:'50px'}
    }}
    position="relative"
    p="20px">
        <Typography color="#FF2625" fontWeight={600} fontSize="26px">
            Fitness Club
        </Typography>
        <Typography fontWeight="700" sx={{
            fontSize:{lg:'44px', sx:'40px'}
        }}
        mb="23px"
        mt = "30px">
            Sweat, Smile <br/> and Repeat
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={4}>
            Check out the most effective exercises
        </Typography>
        <Button variant="contained" color="error" href="/#exercises" sx={{
            backgroundColor:'#FF2625',
            padding:'10px'
        }}>Explore exercises</Button>
        <Typography fontWeight={600} color="#FF2625" sx={{
            opacity: 0.1,
            display: {lg:'block', xs: 'none'}
        }}
        fontSize={200}>Exercise</Typography>
        <img src="https://i.imgur.com/jAD3orc.png" alt="BannerImage" className="hero-banner-img"></img>
    </Box>
  )
}

export default HeroBanner