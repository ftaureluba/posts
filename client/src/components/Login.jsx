import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { apiService } from '../services/PostsService';
import AuthContext from './AuthContext';

function Login() {
    const {login} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // lo voy a tener que usar para volver al home una vez se logue de manera exitosa.

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
          const response = await apiService.PostData('/api/login', { email, password });
          console.log('creo q conecto bien', response)
          const { token } = response.data;

          // Store the token in local storage or a cookie, depending on your preference
          localStorage.setItem('token', token);
          console.log('seteo el token: ', token)
        login(token)
          // Redirect to the home page
          console.log(token)
          
          navigate('/');
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
              <p>dummy user: feli@feli, dummy password: 123</p>
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