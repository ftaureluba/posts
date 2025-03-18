import React, { useEffect } from 'react';
import { useState } from 'react';
import ExerciseForm from './ExerciseForm';
import { apiService } from '../services/PostsService';
import { Box, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 18, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  color: 'white',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
  },
  marginBottom: theme.spacing(3),
}));

interface Exercise {
  _id: string;
  name: string;
}

interface Set {
  reps: string;
  weight: string;
}

interface WorkoutData {
  exerciseId: string;
  name: string;
  sets: Set[];
}

interface DataToSend {
  date: Date;
  exercises: {
    exerciseId: string;
    sets: {
      reps: number;
      weight: number;
    }[];
  }[];
}

interface RutinaDetailProps {
  ejercicios: Exercise[];
}

function RutinaDetail({ ejercicios = [] }: RutinaDetailProps) {
  const [workoutData, setWorkoutData] = useState<WorkoutData[]>(
    ejercicios.map((exercise) => ({
      exerciseId: exercise._id,
      name: exercise.name,
      sets: [{ reps: '', weight: '' }]
    }))
  );

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

  const handleChange = (exerciseIndex: number, setIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutData((prevWorkoutData) => {
      const newWorkoutData = [...prevWorkoutData];
      newWorkoutData[exerciseIndex].sets[setIndex][e.target.name as keyof Set] = e.target.value;
      return newWorkoutData;
    });
  };

  const addSet = (exerciseIndex: number) => {
    setWorkoutData((prevWorkoutData) => {
      const newWorkoutData = [...prevWorkoutData];
      newWorkoutData[exerciseIndex].sets.push({ reps: '', weight: '' });
      
      return newWorkoutData;
    });
  };

  const handleSubmitAll = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const dataToSend: DataToSend = {
          date: new Date(),
          exercises: workoutData.map((workout) => ({
              exerciseId: workout.exerciseId,
              sets: workout.sets.map((set) => ({
                  reps: Number(set.reps),
                  weight: Number(set.weight)
              }))
          }))
        };
        const response = await apiService.PostData('/api/workouts', dataToSend);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error submitting workouts:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', mb: 3 }}>
        <FitnessCenterIcon sx={{ mr: 1, color: '#2196f3' }} />
        Workout Routine
      </Typography>
      {workoutData.map((workout, exerciseIndex) => (
        <StyledPaper key={workout.exerciseId} elevation={3}>
          <Typography variant="h6" sx={{ mb: 2, color: '#2196f3', fontWeight: 600 }}>
            {workout.name}
          </Typography>
          <ExerciseForm
            sets={workout.sets}
            handleChange={(setIndex: number, e: React.ChangeEvent<HTMLInputElement>) => handleChange(exerciseIndex, setIndex, e)}
            addSet={() => addSet(exerciseIndex)}
          />
        </StyledPaper>
      ))}
      <Button
        variant="contained"
        onClick={handleSubmitAll}
        sx={{
          mt: 3,
          backgroundColor: '#2196f3',
          '&:hover': {
            backgroundColor: '#1976d2',
          },
          borderRadius: '8px',
          fontWeight: 600,
          py: 1.5,
          px: 4,
        }}
      >
        Terminar Entrenamiento
      </Button>
    </Box>
  );
}

export default RutinaDetail;