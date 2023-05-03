import { useEffect } from "react";
import { axiosPublic } from "../axios";

function AuthKakao(){
    useEffect(()=>{
        let code = new URL(window.location.href).searchParams.get('code')
        axiosPublic.get(`http://3.37.47.43:8080/oauth2/authorization/kakao?code=${code}`)
        .then(res=>console.log(res));
    },[])
    return <div>hello</div>
}

export default AuthKakao;