import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useEffect } from "react";

        
        
const SingleClass = ({classInfo, setClassId, enrollments}) => {
    // const axiosPublic = useAxiosPublic();
    // const { data:enrollments } = useQuery({
    //     queryKey: ['individualClassEnrollments'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/api/v1/payments/individual-class-enrollments/${classInfo?._id}`);
    //         return res.data;
    //     }
    // })

    // useEffect(()=>{
    //     setClassId(classInfo._id);
    // }, [classInfo._id, setClassId])

    // console.log("enrollments: ", enrollments);
    return (
        <div key={classInfo._id} className="">
                        <div className="relative block overflow-hidden">
                            <button
                                className="absolute end-4 top-4 z-10 rounded-lg bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
                            >
                                <span className="">${classInfo?.price}</span>
                            </button>

                            <img
                                src={classInfo?.image}
                                alt="class image"
                                className="h-32 md:40 lg:h-64 w-full object-cover transition duration-500 hover:scale-105"
                            />

                            <div className="relative border border-gray-100 bg-white p-6">
                                

                                <h3 className="mt-4 text-lg font-medium text-gray-900 capitalize">{classInfo?.title}</h3>

                                <p className="mt-1.5 text-sm text-gray-700 capitalize">Posted by: {classInfo?.name}</p>
                                <p className="mt-1.5 text-sm text-gray-700 capitalize">{classInfo?.description}</p>
                                <p className="mt-1.5 text-sm text-gray-700 capitalize">Total Enrollment: {enrollments}</p>


                                <Link to={`/class/${classInfo?._id}`}
                                        className="group text-center relative w-full block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"
                                    >
                                        <span
                                            className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                                        ></span>
                                        <span
                                            className=" relative text-sm capitalize font-medium text-indigo-600 transition-colors group-hover:text-white"
                                        >
                                            Enroll
                                        </span>
                                    </Link>

                            </div>
                        </div>
                    </div>
    );
};

export default SingleClass;