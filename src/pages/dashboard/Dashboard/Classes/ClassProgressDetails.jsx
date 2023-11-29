import { useParams } from "react-router-dom";

        
        
const ClassProgressDetails = () => {
    const id = useParams()
    console.log("see progress class id:", id);
    return (
        <div>
           <h2 className='text-3xl text-center'>Class Progress Details</h2>
        </div>
    );
};

export default ClassProgressDetails;