import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Typography, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Rutina = ({ rutina }) => {
  const rutinaID = rutina._id.toString();
  const ejercicios = rutina.ejercicios;
  const navigate = useNavigate();
  
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        borderRadius: '16px',
        backgroundColor: 'rgba(17, 17, 18, 0.95)',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardContent sx={{ 
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FitnessCenterIcon sx={{ color: '#2196f3', mr: 1 }} />
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: 'white',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            {rutina.Rutina}
          </Typography>
        </Box>
        
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 2,
          }}
        >
          {rutina.Descripcion}
        </Typography>

        <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ mb: 3, flex: 1, minHeight: '150px' }}>
          {ejercicios.map((ejercicio, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                '&:before': {
                  content: '"•"',
                  marginRight: '8px',
                  color: '#2196f3',
                },
              }}
            >
              {ejercicio.name}
            </Typography>
          ))}
        </Box>

        <Button
          onClick={() => handleNavigate(`/${rutinaID}`)}
          variant="contained"
          fullWidth
          sx={{
            mt: 'auto',
            textTransform: 'none',
            py: 1.5,
            backgroundColor: '#2196f3',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
            borderRadius: '8px',
            fontWeight: 600,
          }}
        >
          Empezar entrenamiento
        </Button>
      </CardContent>
    </Card>
  );
};

export default Rutina;

