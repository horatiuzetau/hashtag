import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { checkReservationsHealth } from './api';
import './App.css';
import FallbackPage from './components/fallback/FallbackPage';
import Navbar from './components/Navbar';
import Wizard from './components/Wizard';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  custom: {
    // Global
    global: {
      minWidth: 'clamp(320px, 100%, 960px)',
      paddingLeftRight: 'clamp(1%, 5vw, 5%)',
      textContrastOpacity: 0.75
    },
    links: {
      iconLinkSize: 'clamp(2rem, 5vw, 3rem)',
      margin: '15px 15px 0px',
    },
    fallback: {
      iconSize: 'clamp(100px, 5vw, 150px)',
      titleSize: 'clamp(1.25rem, 5vw, 1.5rem)',
      subtitleSize: 'clamp(0.9rem, 5vw, 1rem)',
    },
    // Navbar
    navbar: {
      logoSize: 'clamp(75px, 5vw, 100px)',
    },
    // Progress Bar
    progressBar: {
      iconSize: 'clamp(25px, 5vw, 40px)',
      currentIconScale: '1.45'
    },
    // Step
    stepHeader: {
      submitButtonSize: 'clamp(30px, 5vw + 10px, 50px)',
      titleSize: 'clamp(1.25rem, 5vw, 1.5rem)',
      subtitleSize: 'clamp(0.9rem, 10vw, 1rem)',
    },
    // Calendar
    calendar: {
      scale: '1.2'
    },
    // Activities
    activity: {
      textSize: 'clamp(1rem, 5vw, 1.25rem)',
      backgroundColor: '#353757',
      gap: '5px',
      iconSize: 'clamp(30px, 5vw, 35px)'
    },
    // Slots
    slot: {
      textSize: 'clamp(1rem, 5vw, 1.25rem)',
      iconSize: 'clamp(30px, 5vw, 35px)',
      gap: '15px',
      timeBackgroundColor: '#61047D',
      timeTextSize: 'clamp(1rem, 5vw, 1.1rem)',
    },
    // Summary
    summary: {
      iconSize: 'clamp(25px, 5vw, 30px)',
      textSize: 'clamp(1rem, 5vw, 1.25rem)',
      textOpacity: '.85',
      summaryRowMargin: '10px 0'
    },
    // Post Confirmation
    postConfirmation: {
      titleSize: 'clamp(1rem, 3vw, 2rem)',
      subtitleSize: 'clamp(1rem, 3vw, 1.25rem)',
      iconSize: 'clamp(50px, 10vw, 100px)',
      tipsGap: '10px',
      tipsBackgroundColor: '#353757',
    },
  },
  palette: {
    primary: {
      main: '#CA00B7', // use hex code or other color notation
      light: '#ffffff', // optional, light variant of the primary color
      success: '#00FF38',
      error: '#d32f2f',
      fade: '#D9D9D9',
      dark: '#030637', // optional, dark variant of the primary color
      contrastText: '#ffffff' // optional, color for text/icon on primary color
    }
  }
});

export default function App() {
  const [reservationsEnabled, setReservationsEnabled] = useState(false)
  const [fetchedData, setFetchedData] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    checkReservationsHealth()
      .then(data => {
        navigate("/data")
        setReservationsEnabled(true)
        setFetchedData(true)
      })
      .catch(err => {
        setReservationsEnabled(false)
        setFetchedData(true)
      })
  }, [])

  return (
    
    <ThemeProvider theme={theme}>
      <Navbar />
      {reservationsEnabled && <Wizard />}
      {fetchedData && !reservationsEnabled && <FallbackPage />}
    </ThemeProvider>
  );
}
