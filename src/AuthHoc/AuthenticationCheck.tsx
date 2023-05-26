import { Navigate, Outlet } from "react-router-dom"

const AuthenticationCheck=({accessToken}:any)=>{
    if(accessToken!==null){
        return <Navigate to="/main" replace />
    }

    return <Outlet />;
}

export default AuthenticationCheck;