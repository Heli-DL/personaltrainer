import React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Box sx={{width: '65%'}}>
        <h1 style={{fontSize: '5em', margin: '4rem auto 3rem 6rem'}}>Personal trainer database</h1>
      </Box>
      <Button sx={{marginLeft: '6rem', marginRight: 4}} color="primary" variant="contained" size="large">
        <Link style={{textDecoration: "none", color: "white"}} to={'/Customers'}>CUSTOMERS</Link>
      </Button>
      <Button sx={{marginRight: 2.5}} color="primary" variant="contained" size="large">
        <Link style={{textDecoration: "none", color: "white"}} to={'/Trainings'}>TRAININGS</Link>
      </Button>
      <Button sx={{ padding: 0 }}>
        <Link style={{textDecoration: "none", color: "white"}} to={'/Calendar'}>
          <CalendarMonthIcon color="primary" sx={{ fontSize: 50 }}/>
        </Link>
      </Button>
      <Button sx={{ padding: 0 }}>
        <Link style={{textDecoration: "none", color: "white"}} to={'/Charts'}>
          <LeaderboardIcon color="primary" sx={{ fontSize: 50 }}/>
        </Link>
      </Button>
    </div>
  );
}