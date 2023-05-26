import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './Routes/About';
import Login from './Routes/Login';
import Register from './Routes/Register';
import Main from './Routes/Main';
import MySong from './Routes/MySong';
import EditProfile from './Routes/EditProfile';
import RecordVoice from './Routes/RecordVoice';
import AuthKakao from './Routes/AuthKakao';
import AuthGoogle from './Routes/AuthGoogle';
import AuthNaver from './Routes/AuthNaver';

function App() {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main/editprofile" element={<EditProfile />} />
      <Route path="/main/record" element={<RecordVoice />} />
      <Route path="/main/mysong" element={<MySong />} />
      <Route path="/user/kakao/callback" element={<AuthKakao />} />
      <Route path="/user/google/callback" element={<AuthGoogle />} />
      <Route path="/user/naver/callback" element={<AuthNaver />} />
    </Routes>
  );
}
//<Main chunks={chunks} setChunks={setChunks} />
export default App;
