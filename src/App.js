import React, { useState } from 'react';
import './App.css';
import {  Routes,  Route } from "react-router-dom";
import Home from './components/Home';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
import Charts from './components/Charts'
import NavBar from './components/NavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [agTheme, setAgTheme] = useState('ag-theme-alpine');
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
        primary: {
          main: "#01a4b9"
        },
        secondary: {
          main: "#dc3a61"
        }
    },
  });

  const changeMode = () => {
    setDarkMode(!darkMode);
    setAgTheme(darkMode ? 'ag-theme-alpine' : 'ag-theme-alpine-dark');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="background">
        <NavBar darkMode={darkMode} changeMode={changeMode}/>
        <Routes>
          <Route path="personaltrainer/" element={<Home/>}/>
          <Route path="Customers" element={<Customers agTheme={agTheme}/>}/>
          <Route path="Trainings" element={<Trainings agTheme={agTheme}/>}/>
          <Route path="Calendar" element={<Calendar/>}/>
          <Route path="Charts" element={<Charts/>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;