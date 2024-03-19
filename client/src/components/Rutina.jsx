import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const Rutina = ({rutina}) => {

  const rutinaID = rutina._id.toString();
  const ejercicios = rutina.ejercicios
  return (
    
    <Card sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <CardActionArea component={Link} to={`/${rutinaID}`}>
        {rutina.Rutina}
        <CardContent>
            <p>{rutina.Descripcion}</p>
            
            {ejercicios.map((ejercicio, index) => (
            <Typography key={index} variant="body2" color="text.primary">
              - {ejercicio}
            </Typography>
          ))}
        </CardContent>
        </CardActionArea>    
    </Card>
  )
}

export default Rutina;