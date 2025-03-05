import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../services/PostsService';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Paper, 
  Container 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(17, 17, 18, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  color: 'white',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
}));

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setMessage('Invalid token');
          setIsSuccess(false);
          setIsLoading(false);
          return;
        }

        const response = await apiService.fetchData(`/api/verify-email?token=${token}`);
        setMessage(response.data);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        setMessage('Error verifying email.');
        setIsSuccess(false);
        setIsLoading(false);
      }
    };
    verifyEmail();
  }, [searchParams]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh'
      }}>
        <StyledPaper elevation={3}>
          {isLoading ? (
            <CircularProgress sx={{ color: '#2196f3' }} />
          ) : (
            <>
              {isSuccess ? (
                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
              ) : (
                <ErrorOutlineIcon sx={{ fontSize: 60, color: '#f44336', mb: 2 }} />
              )}
              <Typography variant="h5" component="h1" gutterBottom align="center">
                {message}
              </Typography>
            </>
          )}
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default VerifyEmail;

