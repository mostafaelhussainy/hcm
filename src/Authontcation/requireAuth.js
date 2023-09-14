import { Navigate,useLocation } from "react-router"; 
import { useAuth } from "./authActions";

const RequireAuth=({children,token})=>{
const auth = useAuth();
const location = useLocation();
if(!token){
    return <Navigate to="/notAuthorized" state={{path:location.pathname}}/>
}
return children
}
export default RequireAuth;