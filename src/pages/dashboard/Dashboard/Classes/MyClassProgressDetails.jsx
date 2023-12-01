import { PlusCircle } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";


const MyClassProgressDetails = () => {
    const { id } = useParams();
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const axiosPublic = useAxiosPublic();

    

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };


    const onSubmit = (data) => {
        const assignmentContent = {
            classId: id,
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            assignmentCreatedTime: moment().format("h:mm:ss a, D-M-YYYY")
        }

        // console.log(assignmentContent)

        // console.log("student feedback", assignmentContent)

        axiosPublic.post(`/api/v1/users/class-assignment`, assignmentContent, { withCredentials: true })
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Assignment created successfully!")
                    reset();
                }
            })
            .catch(err => {
                // console.log(err)
            })
    }


    const { data: numberOfEnrollments } = useQuery({
        queryKey: ["numberOfEnrollments"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/payments/${id}`, { withCredentials: true })
            return res.data;
        }
    })

    // console.log("numberOfEnrollments --->", numberOfEnrollments);

    const { data: assignmentSubmissions } = useQuery({
        queryKey: ["assignmentSubmissions"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/users/assignments-submissions/${id}`, { withCredentials: true })
            return res.data;
        }
    })

    // console.log("assignmentSubmissions --->", assignmentSubmissions);
    
    const { data: numberOfAssignments={} } = useQuery({
        queryKey: ["numberOfAssignments"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/users/total-class-assignments/${id}`, { withCredentials: true })
            return res.data;
        }
    })
    // console.log("numberOfAssignments --->", numberOfAssignments?.totalAssignments);


    return (
        <div>
            <Helmet>
                <title>Edugram | My Class Progress Details</title>
            </Helmet>
            <h2 className='text-3xl text-center'>My Class Progress Details</h2>

            <div>
                <section className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
                    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-300 sm:text-4xl">
                                Class Progress
                            </h2>

                            <p className="mt-4 text-neutral-900 dark:text-gray-400 sm:text-xl">
                                Here are all the details of this class progress
                            </p>
                        </div>

                        <div className="mt-8 sm:mt-12">
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div
                                    className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center dark:bg-blue-700"
                                >
                                    <dt
                                        className="order-last text-lg font-medium text-neutral-900 capitalize dark:text-neutral-100/75"
                                    >
                                        Total Enrollment
                                    </dt>

                                    <dd
                                        className="text-4xl font-extrabold text-blue-600 dark:text-blue-50 md:text-5xl"
                                    >
                                        {numberOfEnrollments?.totalEnrollments}
                                    </dd>
                                </div>

                                <div
                                    className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center dark:bg-blue-700"
                                >
                                    <dt
                                        className="order-last text-lg font-medium text-neutral-900 capitalize dark:text-neutral-100/75"
                                    >
                                        Total Assignment
                                    </dt>

                                    <dd
                                        className="text-4xl font-extrabold text-blue-600 dark:text-blue-50 md:text-5xl"
                                    >
                                        {numberOfAssignments?.totalAssignments}
                                    </dd>
                                </div>

                                <div
                                    className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center dark:bg-blue-700"
                                >
                                    <dt
                                        className="order-last text-lg font-medium text-neutral-900 capitalize dark:text-neutral-100/75"
                                    >
                                        Per day assignment submission
                                    </dt>

                                    <dd
                                        className="text-4xl font-extrabold text-blue-600 dark:text-blue-50 md:text-5xl"
                                    >
                                        {assignmentSubmissions?.totalSubmission}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>
                <section className="w-4/12 mx-auto">
                    <Link
                        data-modal-target="crud-modal"
                        data-modal-toggle="crud-modal"
                        onClick={toggleModal}
                        className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"

                    >
                        <span
                            className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
                        >
                            Create Assignment
                        </span>

                        <span
                            className="shrink-0 rounded-full border border-current bg-white text-indigo-600 group-active:text-indigo-500"
                        >
                            <PlusCircle size={40} />

                        </span>
                    </Link>

                    <div>

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
                                                Assignment
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
                                                    <label htmlFor="title" className="sr-only">Title</label>
                                                    <div className="mb-3">
                                                        <input
                                                            {...register("title", { required: true })}
                                                            type="text"
                                                            className="w-full rounded-lg bg-gray-50 dark:bg-gray-600 text-neutral-900 dark:text-white placeholder:dark:text-white border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                            placeholder="Assignment title"
                                                            id="title"


                                                        />

                                                        {errors.title && <span className="text-xs text-red-500 ">Title is required</span>}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="deadline" className="sr-only">Deadline</label>
                                                    <div className="mb-3">
                                                        <input
                                                            {...register("deadline", { required: true })}
                                                            type="date"
                                                            className="w-full cursor-pointer rounded-lg dark:bg-gray-600 text-neutral-900 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                            id="deadline"


                                                        />

                                                        {errors.deadline && <span className="text-xs text-red-500 ">Deadline is required</span>}
                                                    </div>
                                                </div>

                                                <div className="col-span-2">
                                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                    <textarea
                                                        {...register("description", { required: true })}
                                                        id="description" rows="4" className="block p-2.5 w-full  placeholder:dark:text-white text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write feedback here"></textarea>
                                                    <div className="my-2">
                                                        {errors.description && <span className="text-xs text-red-500 ">Description number is required</span>}
                                                    </div>
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
                </section>
            </div>

        </div>
    );
};

export default MyClassProgressDetails;