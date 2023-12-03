import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from 'react-hot-toast';
import useAuth from "../../../../hooks/useAuth";

const ClassDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: classData, refetch } = useQuery({
        queryKey: ["classDetails", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/classes/${id}`, { withCredentials: true });
            return res.data;
        },
    });

    const handleEnrollment = async () => {
        // add data to the database
        const cartItem = {
            classId: id,
            email: user?.email,
            image: classData?.image,
            title: classData?.title,
            price: classData?.price,
        };

        await axiosPublic
            .post(`api/v1/carts`, cartItem, { withCredentials: true })
            .then((res) => {
                if (res.data.insertedId) {
                    refetch();
                    toast.success('Successfully added to cart')                                     
                    navigate("/dashboard/cart");                    
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mx-auto my-8">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-4">{classData?.title}</h2>
                <p className="text-gray-600 mb-4">Teacher: {classData?.name}</p>
                <img
                    src={classData?.image}
                    alt={classData?.title}
                    className="w-full h-64 object-cover mb-4"
                />
                <p className="text-lg text-gray-800 mb-4">${classData?.price}</p>
                <p className="text-gray-600 mb-4">{classData?.description}</p>
                <p className="text-gray-600 mb-4">Total Enrolment: </p>
                <button
                    onClick={handleEnrollment}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Pay
                </button>
            </div>
        </div>
    );
};

export default ClassDetails;
