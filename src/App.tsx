import React from 'react';
import { Routes,Route } from 'react-router-dom';
import About from './Route/About';
import Login from './Route/Login';
import Register from './Route/Register';
import Main from './Route/Main';
import MySong from './Route/MySong';

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
