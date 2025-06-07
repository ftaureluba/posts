import React, { useEffect, useState , useCallback} from 'react'
import {useParams} from 'react-router-dom';
import { apiService } from '../services/PostsService';
import RutinaDetail from './RutinaDetail';
import styles from '../styles/rutinaDetailContainer.module.css'

function RutinaDetailContainer() {
    const [ejercicios, setEjercicios] = useState([])
    const {rutina_id} = useParams();
    const fetchEjercicios = useCallback(async () => {
        try {
          const response = await apiService.fetchData(`/api/rutina/${rutina_id}`);
          setEjercicios(response.data.ejercicios);
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      }, [rutina_id]);

      useEffect(() => {
        fetchEjercicios();
      }, [fetchEjercicios]);
    return (
        <div className={styles.container}>
        <RutinaDetail ejercicios = {ejercicios}/>
        </div>
  )
}

export default RutinaDetailContainer