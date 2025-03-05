import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/PostsService';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Paper,
  Container,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 18, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  color: 'white',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2196f3',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
});

const StyledSelect = styled(Select)({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.23)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#2196f3',
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
});

function Signup() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  const [trainingFrequency, setTrainingFrequency] = useState('');
  const [gymObjective, setGymObjective] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const validateStep1 = () => {
    return firstName.trim() !== '' && 
           lastName.trim() !== '' && 
           age.trim() !== '' && 
           weight.trim() !== '';
  };

  const validateStep2 = () => {
    return trainingFrequency.trim() !== '' && 
           gymObjective.trim() !== '';
  };

  const validateStep3 = () => {
    return email.trim() !== '' && 
           password.trim() !== '' && 
           username.trim() !== '';
  };

  const nextStep = () => {
    if (step === 0 && validateStep1()) {
      setStep(1);
    } else if (step === 1 && validateStep2()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      alert('Please fill out all required fields');
      return;
    }
    
    try {
      const userData = {
        username: username,
        email: email,
        password: password
      };
    
      const response = await apiService.PostData('/api/signup', userData);
    
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }      
  };

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Informacion Personal</Typography>
            <StyledTextField
              fullWidth
              margin="normal"
              label="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <StyledTextField
              fullWidth
              margin="normal"
              label="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <StyledTextField
              fullWidth
              margin="normal"
              label="Edad"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <StyledTextField
              fullWidth
              margin="normal"
              label="Peso (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Objetivos</Typography>
            <StyledSelect
              fullWidth
              margin="normal"
              value={trainingFrequency}
              onChange={(e) => setTrainingFrequency(e.target.value)}
              required
              displayEmpty
            >
              <MenuItem value="" disabled>Frecuencia de entrenamiento:</MenuItem>
              <MenuItem value="1-2">1-2 veces por semana</MenuItem>
              <MenuItem value="3-4">3-4 veces por semana</MenuItem>
              <MenuItem value="5-7">5-7 veces por semana</MenuItem>
            </StyledSelect>
            <StyledSelect
              fullWidth
              margin="normal"
              value={gymObjective}
              onChange={(e) => setGymObjective(e.target.value)}
              required
              displayEmpty
              sx={{ mt: 2 }}
            >
              <MenuItem value="" disabled>Objetivo</MenuItem>
              <MenuItem value="muscle-gain">Ganancia Muscular</MenuItem>
              <MenuItem value="weight-loss">Perdida de peso</MenuItem>
              <MenuItem value="endurance">Mejorar la resistencia</MenuItem>
              <MenuItem value="general-fitness">Salud general</MenuItem>
            </StyledSelect>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Detalles de la cuenta</Typography>
            <StyledTextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <StyledTextField
              fullWidth
              margin="normal"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <StyledTextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledPaper>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
            <Step>
              <StepLabel sx={{ color: 'white' }}>Informacion Personal</StepLabel>
            </Step>
            <Step>
              <StepLabel sx={{ color: 'white' }}>Objetivos</StepLabel>
            </Step>
            <Step>
              <StepLabel sx={{ color: 'white' }}>Detalles de la cuenta</StepLabel>
            </Step>
          </Stepper>
          {renderStep()}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            {step > 0 && (
              <Button onClick={prevStep} variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                Anterior
              </Button>
            )}
            {step < 2 ? (
              <Button 
                onClick={nextStep} 
                variant="contained" 
                disabled={
                  (step === 0 && !validateStep1()) || 
                  (step === 1 && !validateStep2())
                }
                sx={{ ml: 'auto' }}
              >
                Siguiente
              </Button>
            ) : (
              <Button 
                type="submit" 
                variant="contained" 
                disabled={!validateStep3()}
                sx={{ ml: 'auto' }}
              >
                Sign Up
              </Button>
            )}
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default Signup;

