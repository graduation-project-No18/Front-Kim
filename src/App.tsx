import React from 'react';
import { Routes,Route, Navigate } from 'react-router-dom';
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
import RequireAuth from './AuthHoc/RequireAuth';
import { useRecoilState } from 'recoil';
import { accessToken } from './recoil';
import AuthenticationCheck from './AuthHoc/AuthenticationCheck';
import NotFound from './Routes/NotFound';

function App() {
  const [token,setToken]=useRecoilState(accessToken);
  return <Routes>
    <Route element={<AuthenticationCheck accessToken={token} />}>
        <Route path='/' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Route>
    <Route element={<RequireAuth accessToken={token}/>}>
        <Route path='/main' element={<Main />} />
        <Route path='/main/editprofile' element={<EditProfile />} />
        <Route path='/main/record' element={<RecordVoice />} />
        <Route path='/main/mysong' element={<MySong />} />
    </Route>
    <Route path='/oauth/redirect' element={<AuthKakao />} />
    <Route path='/user/google/callback' element={<AuthGoogle />} />
    <Route path='/user/naver/callback' element={<AuthNaver />} />
    <Route path='/404' element={<NotFound />} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Routes>
}

export default App;
