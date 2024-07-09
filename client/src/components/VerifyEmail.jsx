import React, { useEffect, useState } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import { apiService } from '../services/PostsService';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        
        const token = searchParams.get('token');
        if (!token) {setMessage('Token invalido')}


        const response = await apiService.fetchData(`/api/verify-email?token=${token}`);
        setMessage(response.data);
      } catch (error) {
        setMessage('Error verifying email.');
      }
    };
    verifyEmail();
  }, [searchParams]);

  return <div>{message}</div>;
};

export default VerifyEmail;
