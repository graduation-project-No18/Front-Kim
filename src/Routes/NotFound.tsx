import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessToken } from "../recoil";

function NotFound(){
    const navigate=useNavigate();
    const [token,setToken]=useRecoilState(accessToken);
    useEffect(()=>{
        if(token===null){
            setTimeout(()=>{
                navigate('/');
            },1000)
        }
        else{
            setTimeout(()=>{
                navigate('/main');
            },1000)
        }
    },[])
    return <h1>Not Found</h1>
}

export default NotFound