import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({accessToken}:any){
    if(accessToken===null){
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}   

export default RequireAuth;