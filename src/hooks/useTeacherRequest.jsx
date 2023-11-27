import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";     
import useAxiosPublic from "./useAxiosPublic";
        

const useTeacherRequest = () => {
    // const {user} = useAuth();    
    const axiosPublic = useAxiosPublic()

    const { data, refetch, isLoading } = useQuery({        
        queryKey: ['teacherRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/v1/users/teacher-requests", {withCredentials: true})
            return res.data;
        }
    })

    return {data, refetch, isLoading}
};

export default useTeacherRequest;


