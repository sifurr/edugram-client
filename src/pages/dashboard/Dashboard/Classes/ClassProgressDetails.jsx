import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Review from "../../../../components/Review";
import { Helmet } from "react-helmet-async";

const ClassProgressDetails = () => {    
    const { id } = useParams(); 
    const axiosPublic = useAxiosPublic();

    const { data: feedbacks } = useQuery({
        queryKey: ["feedbacksForAdmin", id], 
        queryFn: async () => {
            try {
                const res = await axiosPublic.get(`/api/v1/users/class-feedback-admin/${id}`, { withCredentials: true });
                return res.data;
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
                throw error;
            }
        }
    });

    console.log("feedbacks:", feedbacks);

    return (
        <div>
             <Helmet>
                <title>Edugram | Class Progress Details</title>
            </Helmet>
           <h2 className='text-3xl text-center'>Class Progress Details</h2>
           {/* Render your feedbacks here */}
           <div>
            <Review feedbacks={feedbacks} />
           </div>
        </div>
    );
};

export default ClassProgressDetails;
