import React, { useEffect, useState } from 'react';
import { apiService } from '../services/PostsService';
import '../styles/WorkoutHistory.css';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await apiService.fetchData('/api/workouts');
        setWorkouts(response.data);
      } catch (err) {
        setError('Error fetching workouts');
      }
    };

    fetchWorkouts();
  }, []);
  console.log(workouts)
  return (
    <div className="workout-history">
      <h2>Your Workout History</h2>
      {error && <p className="error">{error}</p>}
      {workouts.length > 0 ? (
        <ul className="workout-list">
          {workouts.map((workout) => (
            <li key={workout._id} className="workout-item">
              <h3>{new Date(workout.date).toLocaleDateString()}</h3>
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={index}>
                    <strong>{exercise.exerciseId.name}</strong>
                    <ul>
                      {exercise.sets.map((set, setIndex) => (
                        <li key={setIndex}>
                          {set.reps} reps x {set.weight} kg
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
};

export default WorkoutHistory;
