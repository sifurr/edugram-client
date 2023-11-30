import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useTeacher = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
        enabled: !loading,
        queryKey: [user?.email, 'isTeacher'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/users/teacher/${user.email}`, { withCredentials: true });
            console.log(res.data);
            return res.data?.teacher;
        }
    })
    // console.log("is teacher", isTeacher)
    return [isTeacher, isTeacherLoading];
};

export default useTeacher;