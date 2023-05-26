import React from 'react';
import { axiosPublic } from '../axios';

function AuthGoogle() {
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get('access_token');
  axiosPublic
    .get(
      `http://ec2-3-37-47-43.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google?redirect_uri=http://localhost:3000/user/google/callback&access_token=${accessToken}`,
    )
    .then(res => console.log(res));
  return <div>google</div>;
}

export default AuthGoogle;
