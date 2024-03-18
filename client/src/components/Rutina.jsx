import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Link } from '@mui/material';

const Rutina = ({rutina}) => {


  return (
    
    <Card sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <CardActionArea component={Link} to={`/product/${id}`}>
        {rutina.Rutina}
        <CardContent>
            <p>{rutina.Descripcion}</p>
        </CardContent>
        </CardActionArea>    
    </Card>
  )
}

export default Rutina;