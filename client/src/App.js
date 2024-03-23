import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import NavbarComponent from './components/NavbarComponent.jsx'
import RutinaDetailContainer from './components/RutinaDetailContainer'
import Home from './components/Home';

function App() {
  return (
    <div className='App'>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/posts" element={<Posts />} />
        <Route path='/:rutina_id/' element = {<RutinaDetailContainer />}/>
      </Routes>
    </div>
  );
}

export default App;
