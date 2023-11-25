import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";



const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        enabled: !loading,
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/users/admin/${user.email}`, { withCredentials: true });
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading];
};

export default useAdmin;