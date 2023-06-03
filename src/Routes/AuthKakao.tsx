import { useEffect, useState } from "react";
import { axiosPrivate, axiosPublic } from "../axios";
import { useNavigate } from "react-router-dom";
import { AboutWrapper } from "./About";
import { useRecoilState } from "recoil";
import { user } from "../recoil";

function AuthKakao() {
    const navigate=useNavigate();
    const [userState,setUserState]=useRecoilState(user);
    const memberId='16de3dcd-2fca-473e-8219-6632d8a011a5';
    const temporaryToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzM5NzY0NTY5Iiwicm9sZSI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg3NTE5OTcxfQ._WE2Kdn63B4QH6C9jhn8bTbGxVJ88yhmPaPIt2wpt7M";
    useEffect(() => {
        axiosPrivate.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${temporaryToken}`;
          localStorage.setItem("accessToken",temporaryToken);
          setUserState({...userState,isAuthenticated:true})
          axiosPrivate.get(`http://3.37.47.43:8080/api/members/${memberId}`)
          .then(res=>{
            console.log(res)
            setUserState({
              ...userState,
              introduction:res.data.body.member.introduction,
              nickname:res.data.body.member.nickname,
              profileImg:res.data.body.member.profileImg,
              isAuthenticated:true
            })
          })
          setTimeout(()=>{
            navigate('/main');
          },500)
    }, [])
    return <AboutWrapper />
}

export default AuthKakao;