import React from 'react';
import { Routes,Route } from 'react-router-dom';
import About from './Routes/About';
import Login from './Routes/Login';
import Register from './Routes/Register';
import Main from './Routes/Main';
import MySong from './Routes/MySong';

function App() {
  return <Routes>
    <Route path='/' element={<About />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/main' element={<Main />} />
    <Route path='/main/my18list' element={<MySong />} />
  </Routes>
}

export default App;
