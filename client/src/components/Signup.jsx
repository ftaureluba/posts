import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Here you would typically make a request to your server to authenticate the user
      // For now, we'll just log the email and password
      console.log(`Email: ${email}, Password: ${password}`);
      // After successful login, redirect the user to the home page
      history.push('/');
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