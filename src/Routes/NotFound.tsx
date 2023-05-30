import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { user } from "../recoil";
import { AboutWrapper } from "./About";

function NotFound(){
    const navigate=useNavigate();
    const [userState,setUserState]=useRecoilState(user);
    useEffect(()=>{
        if(!userState.isAuthenticated){
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
    return <AboutWrapper>
        <h1 style={{color:"white",fontSize:40}}>Not Found</h1>
    </AboutWrapper>
}

export default NotFound