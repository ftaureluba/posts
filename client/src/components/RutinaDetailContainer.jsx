import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { apiService } from '../services/PostsService';
import RutinaDetail from './RutinaDetail';


function RutinaDetailContainer() {
    const [ejercicios, setEjercicios] = useState([])
    const {rutina_id} = useParams();
    async function fetchEjercicios() {
        try {
            const response = await apiService.fetchData('./ejercicios');
            setEjercicios(response.data)
        }catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchEjercicios();
    }, [rutina_id]
    )
    return (
        <RutinaDetail />
  )
}

export default RutinaDetailContainer