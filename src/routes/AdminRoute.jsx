import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Spinner from "../components/Spinner";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if(loading || isAdminLoading){
        return <Spinner/>
    }

    if(user && isAdmin){
        return children;
    }


    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default AdminRoute;