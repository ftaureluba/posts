/*import React from 'react'
import Rutina from './Rutina'

function Home() {
  return (
    <Rutina/>
  )
}*/
import React, { useEffect, useState } from 'react';
import Rutina from './Rutina';
import { apiService } from '../services/PostsService';
import '../styles/home.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function Home ()  {
  const [rutinas, setRutinas] = useState([]);
  const navigate = useNavigate();
  const {isLoggedIn, logout} = React.useContext(AuthContext);
  const handleNavigate = (path) => {
    navigate(path)
  };

  useEffect(() => {
    async function fetchRutinas ()  {
      try {
        console.log("entro a fetchrutinas")
        const response = await apiService.fetchData('/api');
        console.log('recibio response: ', response)
        const data = Array.isArray(response.data) ? response.data : [];
        console.log('esta por setear las rutinas: ', response.data)
        setRutinas(data);
      } catch (error) {
        console.error('Error fetching rutinas:', error);
      }
    };

    fetchRutinas();
  }, []);
  console.log(rutinas)
  return (
    
    <div className='home-container'>
      {isLoggedIn ? (
        <div className='home-container'>
      {Array.isArray(rutinas) && rutinas.map(rutina => (
        <div key={rutina._id} className='rutina-item'>
          <Rutina key={rutina._id} rutina={rutina} />
        </div>
        
      ))}
      </div>)
      :(
        <div> <h1>Por favor, <button onClick={ () => handleNavigate('/login')}>inicie sesion</button> o <button onClick={ () => handleNavigate('/signup')}>crea una cuenta</button> para continuar </h1>
         </div>
      )
    }
    </div>
  );
};
export default Home