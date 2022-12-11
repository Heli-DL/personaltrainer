import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Box sx={{width: {lg:'65%'}, marginLeft: {sm: '3rem'}}}>
        <h1 className="homeheading">Personal trainer database</h1>
      </Box>
      <Stack direction="row" spacing={1}>
      <Button sx={{marginLeft: {xs: '1rem', sm: '3rem', md: '6rem'}, marginRight: {sm: '1em'}}} color="primary" variant="contained" size="large">
        <Link style={{textDecoration: "none", color: "white"}} to={'/Customers'}>CUSTOMERS</Link>
      </Button>
      <Button color="primary" variant="contained" size="large">
        <Link style={{textDecoration: "none", color: "white"}} to={'/Trainings'}>TRAININGS</Link>
      </Button>
      <Button sx={{ padding: 0}}>
        <Link style={{textDecoration: "none", color: "white"}} to={'/Calendar'}>
          <CalendarMonthIcon color="primary" sx={{ fontSize: {xs: 30, sm: 50}}}/>
        </Link>
      </Button>
      <Button sx={{ padding: 0 }}>
        <Link style={{textDecoration: "none", color: "white"}} to={'/Charts'}>
          <LeaderboardIcon color="primary" sx={{ fontSize: {xs: 30, sm: 50} }}/>
        </Link>
      </Button>
      </Stack>
    </div>
  );
}