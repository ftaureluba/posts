import React, { useEffect, useMemo, useState, useContext } from 'react';
import Rutina from './Rutina';
import { apiService } from '../services/PostsService';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
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

interface Rutina {
  _id: string;
}

const Home: React.FC = () => {
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchRutinas = async () => {
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

  const rutinasMemo = useMemo(() => {
    return rutinas.map((rutina) => (
      <div key={rutina._id} className="rutina-item">
        <Rutina key={rutina._id} rutina={rutina} />
      </div>
    ));
  }, [rutinas]);

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <div className="home-container">
          {rutinasMemo}
        </div>
      ) : (
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
                  as="span"
                  onClick={() => handleNavigate('/login')}
                  sx={{ cursor: 'pointer' }}
                >
                  inicie sesión
                </StyledLink>{' '}
                o{' '}
                <StyledLink
                  as="span"
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

export default Home;