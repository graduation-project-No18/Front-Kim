import { useEffect } from "react";
import { axiosPrivate, axiosPublic } from "../axios";
import { useNavigate } from "react-router-dom";

function AuthKakao() {
    const navigate=useNavigate();
    const accessToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzM5NzY0NTY5Iiwicm9sZSI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg1OTMxNTc3fQ.IMAtgH4w6JjNiYD3pOKkxAsowpnzUqZNmL84Uq9xf3o";
    useEffect(() => {
        axiosPrivate.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          localStorage.setItem("accessToken",accessToken);
          setTimeout(()=>{
            navigate('/main');
          },1000)
    }, [])
    return <div></div>
}

export default AuthKakao;