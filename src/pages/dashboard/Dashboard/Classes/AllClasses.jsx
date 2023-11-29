import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";



const AllClasses = () => {
    const axiosPublic = useAxiosPublic();
    const { data } = useQuery({
        queryKey: ['allClasses', 'status'],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/v1/users/all-classes");
            return res.data;
        }
    })

    console.log("all classes: ", data);

    return (
        <div>
            <h2 className='text-3xl text-center'>All Classes</h2>
            {
                data?.map(classInfo =>
                    <div key={classInfo._id} >
                        <h1>{classInfo?.title}</h1>
                    </div>)
            }
        </div>
    );
};

export default AllClasses;