import { useQuery } from "@tanstack/react-query";   
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
        

const useMyTeachingRequest = () => {
    const {user} = useAuth();  
    const {email} = user;  
    const axiosPublic = useAxiosPublic()

    const { data, refetch, isLoading } = useQuery({        
        queryKey: ['myTeacherRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/users/my-teaching-requests/${email}`, {withCredentials: true})
            return res.data;
        }
    })

    return {data, refetch, isLoading}
};

export default useMyTeachingRequest;


