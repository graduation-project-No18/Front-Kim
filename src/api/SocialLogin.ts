const KAKAO_API_KEY='4644f42b4b35500ed8e8cf88eb30de90';
const KAKAO_REDIRECT_URI='http://localhost:3000/oauth/redirect';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const GOOGLE_API_KEY='145519435702-vaba0uhg5aip8lm6b3v3ef6d9b8vf8t0.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI='http://localhost:3000/user/google/callback';
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

const NAVER_API_KEY='9044jN2jv_SeM1ejZzgQ';
const NAVER_REDIRECT_URI='http://localhost:3000/user/naver/callback';
export const NAVER_AUTH_URL =`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_API_KEY}&redirect_uri=${NAVER_REDIRECT_URI}&state=Math.random().toString(36).substr(3, 14)`;