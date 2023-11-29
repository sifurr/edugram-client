import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";



const useCart = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/carts?email=${user?.email}`, {withCredentials: true})
            return res.data;
        }
    })

    return [cart, refetch]
};

export default useCart;