import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";



const MyEnrollClassDetails = () => {
    const { id } = useParams();    
    const [isModalOpen, setModalOpen] = useState(false);
    const [ratingStar, setRatingStart] = useState(0)
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();

    const { data: myEnrollClass = {} } = useQuery({
        queryKey: ["myEnrolledClass"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/classes/${id}`, { withCredentials: true })
            return res.data;
        }
    })
    // console.log("myEnrollClass", myEnrollClass);

    const { data: myAssignments = [] } = useQuery({
        queryKey: ["myAssignments"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/users/class-assignments/${id}`, { withCredentials: true })
            return res.data;
        }
    })
    // console.log("myAssignments", myAssignments);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const ratingChanged = (newRating) => {
        // console.log(newRating);
        setRatingStart(parseInt(newRating));
    };

    const onSubmit = (data) => {

        const studentFeedback = {
            description: data.description,
            rating: ratingStar,
            classId: id,
            classTitle: myEnrollClass?.title,
            teacherName: myEnrollClass?.name,
            teacherEmail: myEnrollClass?.email,
            studentName: user?.displayName,
            studentEmail: user?.email,
            studentImage: user?.photoURL,
            feedbackTime: moment().format("h:mm:ss a, D-M-YYYY")
        }

        // console.log("student feedback", studentFeedback)


        axiosPublic.post(`/api/v1/users/class-feedback`, studentFeedback, { withCredentials: true })
            .then(res => {
                if (res.data.insertedId) {

                    reset();
                    toast.success("Thanks for your feedback!")                   

                }
            })
            .catch(err => {
                // console.log(err)
            })
    }

    // console.log(ratingStar)

    const handleAssignmentSubmit = () => {
        const submission = {
            classId: id,
            studentName: user?.displayName,
            studentEmail: user?.email,           
            classTitle: myEnrollClass?.title,
            teacherName: myEnrollClass?.name,
            teacherEmail: myEnrollClass?.email, 
            submissionTime: moment().format("h:mm:ss a, D-M-YYYY")
        }

        axiosPublic.post(`/api/v1/users/assignments-submissions`, submission ,{withCredentials:true})
        .then(res => {
            if (res.data.insertedId) {
                reset();
                toast.success("You submitted assignment successfully!") 
            }
        })
        .catch(err => {
            // console.log(err)
        })
    }


    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
            <Helmet>
                <title>Edugram | My Enrolled Class Details</title>
            </Helmet>
            <h2 className='text-3xl text-center mt-20 mb-10'>My Enrolled Class Details</h2>



            <div className="text-center my-10">
                <button
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    onClick={toggleModal}
                    className="group relative inline-block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"
                >
                    <span
                        className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                    ></span>
                    <span
                        className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                    >
                        Teaching Evaluation Report
                    </span>
                </button>

                {/* modal */}
                <div className="flex justify-center items-center ">

                    {/* Main modal */}
                    <div
                        id="crud-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className={`${isModalOpen
                            ? 'fixed top-1/2 left-1/2 transform drop-shadow-lg -translate-x-1/2 -translate-y-1/2'
                            : 'hidden'
                            } overflow-y-auto overflow-x-hidden z-50 w-full md:max-w-md bg-white rounded-lg shadow dark:bg-gray-700`}
                    >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            {/* Modal content */}
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Feedback
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={toggleModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"

                                    >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                {/* Modal body */}
                                <form onSubmit={handleSubmit(onSubmit)}
                                    className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <textarea
                                                {...register("description", { required: true })}
                                                id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write feedback here"></textarea>
                                            <div className="my-2">
                                                {errors.description && <span className="text-xs text-red-500 ">Description number is required</span>}
                                            </div>
                                        </div>
                                        <div className="col-span-2 flex flex-col items-center justify-center">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={24}
                                                activeColor="#ffd700"
                                            />
                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        className="group w-full relative block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"
                                    >
                                        <span
                                            className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                                        ></span>
                                        <span
                                            className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                                        >
                                            Send
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-10/12 mx-auto rounded-lg border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300  min-w-full divide-y-2 divide-gray-200 text-xs">
                        <thead className="ltr:text-left rtl:text-right ">
                            <tr >
                                <th className="text-neutral-900 dark:text-neutral-300 whitespace-nowrap px-4 py-2 font-medium">
                                    #
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Title
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Description
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Deadline
                                </th>

                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Submission
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                myAssignments?.map((assignment, idx) =>

                                    <tr key={assignment._id}>
                                        <td className="whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            {idx + 1}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            {assignment?.title}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            {assignment?.description}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            {assignment?.deadline}</td>

                                        <td className="whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            <button
                                                className="group relative inline-block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"
                                            onClick={handleAssignmentSubmit}
                                            >
                                                <span
                                                    className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                                                ></span>
                                                <span
                                                    className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                                                >
                                                    Submit
                                                </span>
                                            </button>
                                        </td>

                                    </tr>

                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default MyEnrollClassDetails;