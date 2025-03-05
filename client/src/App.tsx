import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import NavbarComponent from './components/NavbarComponent.jsx'
import RutinaDetailContainer from './components/RutinaDetailContainer'
import Home from './components/Home';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import Historial from './components/Historial.jsx';
import VerifyEmail from './components/VerifyEmail.jsx'
import './App.css'
function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <NavbarComponent />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/posts" element={<Posts />} />
            <Route path='/:rutina_id/' element = {<RutinaDetailContainer />}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/historial' element = {<Historial />} />
            <Route path='/verify-email' element = {<VerifyEmail />} />
          </Routes>
          </div>
      </div>
    </AuthProvider>
  );
}

export default App;
