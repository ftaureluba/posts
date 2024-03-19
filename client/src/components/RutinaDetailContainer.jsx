import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { apiService } from '../services/PostsService';
import RutinaDetail from './RutinaDetail';


function RutinaDetailContainer() {
    const [ejercicios, setEjercicios] = useState([])
    const {rutina_id} = useParams();
    async function fetchEjercicios() {
        try {
            const response = await apiService.fetchData(`/${rutina_id}`);
            setEjercicios(response.data.ejercicios)
        }catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchEjercicios();
    }, [rutina_id]
    )
    return (
        
        <RutinaDetail props = {ejercicios}/>
        
  )
}

export default RutinaDetailContainer