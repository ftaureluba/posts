import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

function Rutina(props) {
    const {nombre, descripcion} = props;
  return (
    <Card sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <CardActionArea>
        {nombre}
        <CardContent>
            <p>{descripcion}</p>
        </CardContent>
        </CardActionArea>    
    </Card>
  )
}

export default Rutina;