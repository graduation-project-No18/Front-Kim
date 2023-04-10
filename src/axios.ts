import axios from 'axios';

const BASE_URL="";

//accessToken없이도 접근 가능한 axios 인스턴스
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

//accessToken이 있어야 접근 가능한 axios 인스턴스
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

