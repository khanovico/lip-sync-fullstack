import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import Sync from './page/Sync';
import './App.css';

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/sync' element={<Sync />} />
        <Route path='*' element={<Navigate to={''} />} />
      </Routes>
    </Router>
  );
}

export default App;
