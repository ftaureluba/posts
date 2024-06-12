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
function Home ()  {
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    async function fetchRutinas ()  {
      try {
        const response = await apiService.fetchData();
        const data = Array.isArray(response.data) ? response.data : [];
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
      {Array.isArray(rutinas) && rutinas.map(rutina => (
        <div key={rutina._id} className='rutina-item'>
          <Rutina key={rutina._id} rutina={rutina} />
        </div>
      ))}
    </div>
  );
};
export default Home