import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import NavbarComponent from './components/NavbarComponent.jsx'
import RutinaDetailContainer from './components/RutinaDetailContainer'
import Home from './components/Home';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { AuthProvider } from './components/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/posts" element={<Posts />} />
          <Route path='/:rutina_id/' element = {<RutinaDetailContainer />}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Signup />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
