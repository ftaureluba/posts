import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Posts from './components/Posts';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
}

export default App;
