import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

import useAxiosPublic from "./useAxiosPublic";


const useMyEnrolledClass = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();    

    const {data, refetch} = useQuery({
        queryKey: ['paidClasses'],
        queryFn: async () =>{
            const res = await axiosPublic.get(`/api/v1/users/my-classes/${user?.email}`, {withCredentials: true})
            return res.data;
        }
    })

    return { data, refetch }
};

export default useMyEnrolledClass;






