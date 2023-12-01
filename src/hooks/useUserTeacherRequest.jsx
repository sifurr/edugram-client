import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

        
        
const useUserTeacherRequest = () => {
    const {user} = useAuth();  
    const {email} = user;  
    const axiosPublic = useAxiosPublic()

    const { data: userTeacherRequest, refetch, isLoading } = useQuery({        
        queryKey: ['myTeacherRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/users/user-teacher-request/${email}`, {withCredentials: true})
            return res.data;
        }
    })

    console.log("From use teaching req", userTeacherRequest)

    return {userTeacherRequest, refetch, isLoading}
};

export default useUserTeacherRequest;