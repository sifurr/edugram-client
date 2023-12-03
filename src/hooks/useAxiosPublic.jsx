import axios from "axios";

const axiosPublic = axios.create({        
    baseURL: `https://student-and-class-management-server-one.vercel.app`
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
