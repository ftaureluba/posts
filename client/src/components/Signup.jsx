import React, {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import { apiService } from '../services/PostsService';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Here you would typically make a request to your server to authenticate the user
      // For now, we'll just log the email and password
      try {
        // Collect the user data
        const userData = {
          username: username, // Assuming username is a state variable holding the username input
          email: email, // Assuming email is a state variable holding the email input
          password: password // Assuming password is a state variable holding the password input
        };
      
        // Send the user data to the server
        const response = await apiService.PostData('/api/signup', userData);
      
        console.log(response.data);
        // Optionally, clear the form after submission
        
      } catch (error) {
        console.error('Error signing up:', error);
      }      
      console.log(`Email: ${email}, Password: ${password}`);
      // After successful login, redirect the user to the home page
      navigate('/');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input 
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    );
}

export default Signup