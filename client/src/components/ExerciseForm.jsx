import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ExerciseForm = ({ sets, handleChange, addSet }) => {
  return (
    <Box>
      {sets.map((set, setIndex) => (
        <Box key={setIndex} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            name="reps"
            label="Reps"
            type="number"
            value={set.reps}
            onChange={(e) => handleChange(setIndex, e)}
            variant="outlined"
            size="small"
            InputProps={{
              sx: { color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' } }
            }}
            InputLabelProps={{
              sx: { color: 'rgba(255, 255, 255, 0.7)' }
            }}
          />
          <TextField
            name="weight"
            label="Weight (kg)"
            type="number"
            value={set.weight}
            onChange={(e) => handleChange(setIndex, e)}
            variant="outlined"
            size="small"
            InputProps={{
              sx: { color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' } }
            }}
            InputLabelProps={{
              sx: { color: 'rgba(255, 255, 255, 0.7)' }
            }}
          />
        </Box>
      ))}
      <IconButton onClick={addSet} sx={{ color: '#2196f3', mt: 1 }}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default ExerciseForm;

