import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Posts from './components/Posts';

function App() {
  return (
    <Routes>
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
}

export default App;
