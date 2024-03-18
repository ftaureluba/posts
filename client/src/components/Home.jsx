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

function Home ()  {
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    async function fetchRutinas ()  {
      try {
        const response = await apiService.fetchData();
        setRutinas(response.data);
      } catch (error) {
        console.error('Error fetching rutinas:', error);
      }
    };

    fetchRutinas();
  }, []);

  return (
    <div>
      {rutinas.map(rutina => (
        <Rutina key={rutina._id} rutina={rutina} />
        
      ))}
    </div>
  );
};
export default Home