import React, { useEffect } from 'react'
import { useState } from 'react';
import ExerciseForm from './ExerciseForm';
import { apiService } from '../services/PostsService';
import styles from '../styles/rutinaDetail.module.css'

function RutinaDetail({ejercicios = []}) {
  //const exercisesArray = ejercicios.props

  console.log(ejercicios)
  const [workoutData, setWorkoutData] = useState(
    ejercicios.map((exercise) => ({
      exercise: exercise,
      sets: [{ reps: '', weight: '' }]
    }))
  );
  // Function to handle changes to any form input
  useEffect(() => {
    if (ejercicios.length > 0) {
      setWorkoutData(
        ejercicios.map((exercise) => ({
          exerciseId: exercise._id,
          name: exercise.name,
          sets: [{ reps: '', weight: '' }]
        }))
      );
    }
  }, [ejercicios]);
  const handleChange = (exerciseIndex, setIndex, e) => {
    setWorkoutData((prevWorkoutData) => {
      const newWorkoutData = [...prevWorkoutData];
      newWorkoutData[exerciseIndex].sets[setIndex][e.target.name] = e.target.value;
      return newWorkoutData;
    });
  };

  const addSet = (exerciseIndex) => {
    setWorkoutData((prevWorkoutData) => {
      console.log(`agregando set a : ${exerciseIndex}`)
      const newWorkoutData = [...prevWorkoutData];
      newWorkoutData[exerciseIndex].sets.push({ reps: '', weight: '' });
      
      return newWorkoutData;
    });
  };

  // Function to handle form submission
  const handleSubmitAll = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')

    try {
      if (token){ //CHEQUEAR QUE LA LOGICA DEL TOKEN REALMENTE PUEDA FUNCIONAR BIEN, ES PEDIRLE SI EXISTE EL TOKEN PARA VER EL LOGIN CREO
      const dataToSend = {
        date: new Date(),
        exercises: workoutData.map((workout) => ({
            exerciseId: workout.exerciseId,
            //name: workout.exercise,
            sets: workout.sets.map((set) => ({
                reps: Number(set.reps),
                weight: Number(set.weight)
            }))
        }))
    };
    const response = await apiService.PostData('/api/workouts', dataToSend);
    console.log(response.data);}
    } catch (error) {
      console.error('Error submitting workouts:', error);
    }
  };

  return (
    <div>
      {workoutData.map((workout, exerciseIndex) => (
      <div key={exerciseIndex} className={styles.exercise}>
        <h2 className={styles.exerciseTitle}>{workout.name}</h2>
        <ExerciseForm
          key={exerciseIndex} // Add a key prop
          sets={workout.sets}
          handleChange={(setIndex, e) => handleChange(exerciseIndex, setIndex, e)}
          addSet={() => addSet(exerciseIndex)}
        />
      </div>
      
      ))}

      <button onClick={handleSubmitAll}>Submit All</button>
    </div>
  );
}

export default RutinaDetail



/*
<h2>{ejercicio}</h2>
      <form>
      <input
        type="number"
        name="sets"
        placeholder="Sets"
        value={formData.sets}
        onChange={(e) => handleChange(index, e)}
      />
      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={formData.reps}
        onChange={(e) => handleChange(index, e)}
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight"
        value={formData.weight}
        onChange={(e) => handleChange(index, e)}
      />
    </form>
*/

/*import React, { useState } from 'react';
import axios from 'axios';
const FormEjercicios = ({ exercise, onChange, formData }) => {
  return (
    <form>
      <input
        type="number"
        name="sets"
        placeholder="Sets"
        value={formData.sets}
        onChange={onChange}
      />
      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={formData.reps}
        onChange={onChange}
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight"
        value={formData.weight}
        onChange={onChange}
      />
    </form>
  );
};


function RutinaDetail({ ejercicios }) {
  // Initialize state to hold form data for each exercise
  const ejerciciosArray = ejercicios.props
  
  const [formData, setFormData] = useState(
    ejerciciosArray.map(() => ({ sets: '', reps: '', weight: '' }))
  );

  // Function to handle changes to any form input
  const handleChange = (index, e) => {
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      [e.target.name]: e.target.value
    };
    setFormData(newFormData);
  };

  // Function to handle form submission
  const handleSubmitAll = async (e) => {
    e.preventDefault();
    try {
      // Map over the exercises and form data to create an array of promises
      const promises = ejerciciosArray.map((exercise, index) =>
        axios.post('/api/workouts', {
          exercise,
          ...formData[index]
        })
      );
      // Wait for all promises to resolve
      const responses = await Promise.all(promises);
      console.log(responses.map(res => res.data));
      // Optionally, clear the form after submission
      setFormData(formData.map(() => ({ sets: '', reps: '', weight: '' })));
    } catch (error) {
      console.error('Error submitting workouts:', error);
    }
  };

  return (
    <div>
      {ejerciciosArray.map((ejercicio, index) => (
        <div key={index}>
          <h2>{ejercicio}</h2>
          <FormEjercicios
            exercise={ejercicio}
            formData={formData[index]}
            onChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}
      <button onClick={handleSubmitAll}>Submit All</button>
    </div>
  );
}

export default RutinaDetail;*/