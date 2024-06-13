import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { apiService } from '../services/PostsService';
import RutinaDetail from './RutinaDetail';
import styles from '../styles/rutinaDetailContainer.module.css'

function RutinaDetailContainer() {
    const [ejercicios, setEjercicios] = useState([])
    const {rutina_id} = useParams();
    async function fetchEjercicios() {
        try {
            const response = await apiService.fetchData(`/api/${rutina_id}`);
            setEjercicios(response.data.ejercicios)
            console.log(response)
            console.log()
        }catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
         fetchEjercicios();
    }, [rutina_id]
    )
    return (
        <div className={styles.container}>
            {console.log(ejercicios)}
        <RutinaDetail ejercicios = {ejercicios}/>
        </div>
  )
}

export default RutinaDetailContainer