import { Navigate, Outlet } from "react-router-dom"

const AuthenticationCheck=({isAuthenticated}:any)=>{
    if(isAuthenticated){
        return <Navigate to="/main" replace />
    }

    return <Outlet />;
}

export default AuthenticationCheck;