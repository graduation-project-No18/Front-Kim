import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({isAuthenticated}:any){
    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}   

export default RequireAuth;