import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/rutinaCard.css'
const Rutina = ({rutina}) => {
  console.log(rutina)
  const rutinaID = rutina._id.toString();
  const ejercicios = rutina.ejercicios
  
  return (
    
    <Card sx={{
      maxWidth: 345,

      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: '10px', // Margin for spacing between cards
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for 3D effect
      borderRadius: '8px', // Rounded corners
      backgroundColor: '#1976d2', // White background for better contrast
      padding: '10px', // Padding inside the card
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
      },
    }}>
        <CardActionArea component={Link} to={`/${rutinaID}`}>
        {rutina.Rutina}
        <CardContent>
            <p>{rutina.Descripcion}</p>
            
            {ejercicios.map((ejercicio, index) => (
            <Typography key={index} variant="body2" color="text.primary">
              - {ejercicio.name}
            </Typography>))}
            <Button onClick={() => useNavigate(`/${rutinaID}`)} variant='contained'>Empezar entrenamiento</Button>
        </CardContent>
        </CardActionArea>    
    </Card>
  )
}

export default Rutina;