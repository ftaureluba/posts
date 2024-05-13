import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate(); // lo voy a tener que usar para volver al home una vez se logue de manera exitosa.

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(`Email: ${email}, Password: ${password}`);

      try {
          const response = await axios.post('/api/login', { email, password });
          const { token } = response.data;

          // Store the token in local storage or a cookie, depending on your preference
          localStorage.setItem('token', token);

          // Redirect to the home page
          history.push('/');
      } catch (error) {
          console.error('Login failed:', error);
          // Handle the error, e.g., show an error message to the user
      }
  }

  return (
      <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                  Email:
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </label>
              <label>
                  Password:
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </label>
              <button type="submit">Login</button>
            </div>
            <div>
                <p>No tienes una cuenta?</p>
                <Link to='/signup'>Signup</Link>
            </div>
          </form>
      </div>
  );
}
export default Login