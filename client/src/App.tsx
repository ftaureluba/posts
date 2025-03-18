import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import NavbarComponent from './components/NavbarComponent';
import RutinaDetailContainer from './components/RutinaDetailContainer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './components/AuthContext';
import Historial from './components/Historial';
import VerifyEmail from './components/VerifyEmail';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <NavbarComponent />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/:rutina_id/" element={<RutinaDetailContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;