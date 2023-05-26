import React from 'react';
import { axiosPublic } from '../axios';

function AuthNaver() {
  const code = new URL(window.location.href).searchParams.get('code');
  axiosPublic
    .post(
      `http://3.37.47.43:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000/user/naver/callback&code=${code}`,
    )
    .then(res => console.log(res));
  return <div>naver</div>;
}

export default AuthNaver;
