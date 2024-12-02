
import React, { useEffect, useMemo, useState } from 'react';
import Rutina from './Rutina';
import { apiService } from '../services/PostsService';
import '../styles/home.css';
import {  useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

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

  const login_memo = useMemo(() => {
    <div> 
      <h1>Por favor, <button onClick={ () => handleNavigate('/login')}>inicie sesion</button> o <button onClick={ () => handleNavigate('/signup')}>crea una cuenta</button> para continuar </h1>
    </div>
  }, [handleNavigate])
  return (
    
    <div className='home-container'>
      {isLoggedIn ? (
        <div className='home-container'>
          {rutinas_memo}
        </div>
      ):
      (
        <div className='home-container'>
        {login_memo}
        </div>
      )}
    </div>
  );
};
export default Home