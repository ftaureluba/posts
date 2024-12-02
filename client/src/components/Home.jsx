
import React, { useEffect, useMemo, useState } from 'react';
import Rutina from './Rutina';
import { apiService } from '../services/PostsService';
import '../styles/home.css';
import {  useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import { Box, Typography, Link, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 18, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  color: 'white',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

function Home ()  {
  const [rutinas, setRutinas] = useState([]);
  const navigate = useNavigate();
  const {isLoggedIn} = React.useContext(AuthContext);
  const handleNavigate = (path) => {
    navigate(path)
  };

  useEffect(() => {
    async function fetchRutinas ()  {
      try {
        const response = await apiService.fetchData('/api');
        const data = Array.isArray(response.data) ? response.data : [];
        setRutinas(data);
      } catch (error) {
        console.error('Error fetching rutinas:', error);
      }
    };

    fetchRutinas();
  }, []);

  const rutinas_memo = useMemo(() => {
    return rutinas.map(rutina => (
      <div key={rutina._id} className='rutina-item'>
        <Rutina key={rutina._id} rutina={rutina} />
      </div>
    ))
  }, [rutinas])

  return (
    
    <div className='home-container'>
      {isLoggedIn ? (
        <div className='home-container'>
          {rutinas_memo}
        </div>
      ):
      (
        
        <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledPaper elevation={3}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Por favor,{' '}
            <StyledLink
              component="span"
              onClick={() => handleNavigate('/login')}
              sx={{ cursor: 'pointer' }}
            >
              inicie sesión
            </StyledLink>{' '}
            o{' '}
            <StyledLink
              component="span"
              onClick={() => handleNavigate('/signup')}
              sx={{ cursor: 'pointer' }}
            >
              cree una cuenta
            </StyledLink>{' '}
            para continuar
          </Typography>
        </StyledPaper>
      </Box>
    </Container>
        
      )}
    </div>
  );
};
export default Home