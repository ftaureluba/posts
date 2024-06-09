import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { apiService } from '../services/PostsService';

const VerifyEmail = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const response = await apiService.fetchData(`/verify-email?token=${token}`);
        setMessage(response.data);
      } catch (error) {
        setMessage('Error verifying email.');
      }
    };
    verifyEmail();
  }, [location.search]);

  return <div>{message}</div>;
};

export default VerifyEmail;
