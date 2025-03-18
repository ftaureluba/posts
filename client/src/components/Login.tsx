import React, { useContext, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { apiService } from '../services/PostsService';
import AuthContext from './AuthContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await apiService.PostData('/api/login', { email, password });
      console.log('Login successful', response);
      const { token } = response.data;

      localStorage.setItem('token', token);
      login(token);
      console.log(token);

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StyledPaper elevation={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40, color: '#2196f3', mb: 2 }} />
            <Typography component="h1" variant="h5" gutterBottom>
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <StyledTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Typography variant="body2" color="white" align="center">
                Dummy user: feli@feli, dummy password: 123
              </Typography>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="white">
                  No tienes una cuenta?{' '}
                  <Link component={RouterLink} to="/signup" color="primary">
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </StyledPaper>
      </Box>
    </Container>
  );
}

export default Login;

