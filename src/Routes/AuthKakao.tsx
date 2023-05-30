import { useEffect, useState } from "react";
import { axiosPrivate, axiosPublic } from "../axios";
import { useNavigate } from "react-router-dom";
import { AboutWrapper } from "./About";
import { useRecoilState } from "recoil";
import { user } from "../recoil";

function AuthKakao() {
    const navigate=useNavigate();
    const [userState,setUserState]=useRecoilState(user);
    const temporaryToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzM5NzY0NTY5Iiwicm9sZSI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg1OTMxNTc3fQ.IMAtgH4w6JjNiYD3pOKkxAsowpnzUqZNmL84Uq9xf3o";
    useEffect(() => {
        axiosPrivate.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${temporaryToken}`;
          localStorage.setItem("accessToken",temporaryToken);
          setUserState({...userState,isAuthenticated:true})
          setTimeout(()=>{
            navigate('/main');
          },500)
    }, [])
    return <AboutWrapper />
}

export default AuthKakao;