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
            <Typography variant="h6" gutterBottom>Personal Information</Typography>
            <StyledTextField
              fullWidth
              margin="normal"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <StyledTextField
              fullWidth
              margin="normal"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <StyledTextField
              fullWidth
              margin="normal"
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <StyledTextField
              fullWidth
              margin="normal"
              label="Weight (kg)"
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
            <Typography variant="h6" gutterBottom>Fitness Goals</Typography>
            <StyledSelect
              fullWidth
              margin="normal"
              value={trainingFrequency}
              onChange={(e) => setTrainingFrequency(e.target.value)}
              required
              displayEmpty
            >
              <MenuItem value="" disabled>Select Training Frequency</MenuItem>
              <MenuItem value="1-2">1-2 times per week</MenuItem>
              <MenuItem value="3-4">3-4 times per week</MenuItem>
              <MenuItem value="5-7">5-7 times per week</MenuItem>
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
              <MenuItem value="" disabled>Select Gym Objective</MenuItem>
              <MenuItem value="muscle-gain">Muscle Gain</MenuItem>
              <MenuItem value="weight-loss">Weight Loss</MenuItem>
              <MenuItem value="endurance">Improve Endurance</MenuItem>
              <MenuItem value="general-fitness">General Fitness</MenuItem>
            </StyledSelect>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Account Details</Typography>
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
              <StepLabel sx={{ color: 'white' }}>Personal Info</StepLabel>
            </Step>
            <Step>
              <StepLabel sx={{ color: 'white' }}>Fitness Goals</StepLabel>
            </Step>
            <Step>
              <StepLabel sx={{ color: 'white' }}>Account Details</StepLabel>
            </Step>
          </Stepper>
          {renderStep()}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            {step > 0 && (
              <Button onClick={prevStep} variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                Previous
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
                Next
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

