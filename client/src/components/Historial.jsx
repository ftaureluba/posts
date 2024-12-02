import React, { useEffect, useState } from 'react';
import { apiService } from '../services/PostsService';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Paper, 
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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
  },[theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await apiService.fetchData('/api/workouts');
        setWorkouts(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (err) {
        setError('Error fetching workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? 2 : 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        <FitnessCenterIcon sx={{ mr: 1, color: '#FFFFFF' }} />
        Tu historial de entrenamientos:
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {workouts.length > 0 ? (
        <List>
          {workouts.map((workout) => (
            <ListItem key={workout._id} sx={{ mb: isMobile ? 2 : 3, p: 0 }}>
              <StyledPaper elevation={3}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon sx={{ mr: 1, color: '#2196f3' }} />
                  {new Date(workout.date).toLocaleDateString()}
                </Typography>
                <List disablePadding>
                  {workout.exercises.map((exercise, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={{ color: '#2196f3', fontWeight: 600 }}>
                              {exercise.exerciseName}
                            </Typography>
                          }
                          secondary={
                            <List dense disablePadding>
                              {exercise.sets.map((set, setIndex) => (
                                <ListItem key={setIndex} sx={{ py: 0.5, px: 0 }}>
                                  <ListItemText
                                    primary={
                                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {set.reps} reps x {set.weight} kg
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          }
                        />
                      </ListItem>
                      {index < workout.exercises.length - 1 && (
                        <Divider sx={{ my: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </StyledPaper>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>No se encontraron entrenamientos.</Typography>
      )}
    </Box>
  );
};

export default WorkoutHistory;