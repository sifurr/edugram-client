import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";     
import useAxiosPublic from "./useAxiosPublic";
        

const useUser = () => {
    const {user} = useAuth()   
    const {email} = user;
    const axiosPublic = useAxiosPublic()

    const { data, refetch, isLoading } = useQuery({        
        queryKey: ['user', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/user?email=${email}`, {withCredentials: true})
            return res.data;
        }
    })

    return {data, refetch, isLoading}
};
export default useUser;