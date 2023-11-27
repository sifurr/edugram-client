import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Spinner from "../components/Spinner";
import useTeacher from "../hooks/useTeacher";

const TeacherRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isTeacher, isTeacherLoading] = useTeacher()
    const location = useLocation()

    if(loading || isTeacherLoading){
        return <Spinner />
    }

    if(user && isTeacher){
        return children;
    }


    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default TeacherRoute;