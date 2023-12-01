import { Helmet } from "react-helmet-async";
import useTeacherRequest from "../../../hooks/useTeacherRequest";
import Swal from "sweetalert2";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Tooltip } from 'flowbite-react';
import { useForm } from "react-hook-form";
import { useState } from "react";






const TeacherRequests = () => {

    const { data, refetch } = useTeacherRequest();
    const [searchResult, setSearchResult] = useState({});
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    // category  email experience name photo requestMade requestedTime  title   

    const axiosPublic = useAxiosPublic();

    // console.log(data)


    const onSubmit = async (data) => {

        const searchText = data.searchTerm;

        console.log("search text-->", searchText)

        const res = await axiosPublic.get(`/api/v1/users/find?search=${searchText}`, { withCredentials: true })
        setSearchResult(res.data);
        reset()
        // console.log("search result 1-->", searchResult)

    }

    console.log("search result 2-->", searchResult)



    const handleApprove = teacherReq => {
        Swal.fire({
            title: "Approve user as a Teacher?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.patch(`/api/v1/users/make-teacher/${teacherReq._id}`, null, { withCredentials: true })
                    .then(res => {
                        // console.log("make teacher res -->",res)
                        if (res.data.success) {
                            refetch();
                            Swal.fire({
                                title: `${teacherReq.name} is now a teacher`,
                                text: "",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        } else {
                            Swal.fire({
                                title: res.data.message,
                                icon: "error",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
            }
        });

        // console.log("teacher id: ", teacherReq._id)
    }

    const handleReject = teacherReq => {
        Swal.fire({
            title: "Reject user as a Teacher?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/api/v1/users/reject-teacher/${teacherReq._id}`, null, { withCredentials: true })
                    .then(res => {
                        if (res.data.success) {
                            refetch();
                            Swal.fire({
                                title: `${teacherReq.name} is now in the pending list`,
                                text: "",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        } else {
                            Swal.fire({
                                title: res.data.message,
                                icon: "error",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
            }
        });

        // console.log("teacher id: ", teacherReq._id)
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
            <Helmet>
                <title>Edugram | Teacher Requests</title>
            </Helmet>
            <h2 className='text-3xl text-center mt-20 mb-10'>Teacher Requests</h2>

            {/* search bar */}
            <div className="w-3/12 mx-auto my-5">
                <form onSubmit={handleSubmit(onSubmit)} className="relative">
                    <label htmlFor="Search" className="sr-only"> Search </label>

                    <input
                        {...register("searchTerm", { required: false })}
                        type="text"
                        id="Search"
                        placeholder="Search for..."
                        className="w-full rounded-md border-gray-200 text-neutral-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />                    

                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button type="submit" className="text-gray-600 hover:text-gray-700">
                            <span className="sr-only">Search</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </button>
                    </span>
                </form>
            </div>

            {/* search based user */}
            {
                searchResult ?
                <div className="mt-5 mb-10 text-center w-8/12 mx-auto">
                    <div className="overflow-x-auto">
                        <table
                            className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
                        >
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Name</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                        Email
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Role</th>                                    
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr>
                                    <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                        {searchResult?.name}
                                    </td>
                                    <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{searchResult?.email}</td>
                                    <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{searchResult?.role}</td>                                    
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <p className="text-center mt-5 mb-10">Nothing found!</p>


                // <div className="shadow-xl w-3/12 mx-auto mb-4">
                //     <article className="rounded-xl dark:border border-2  p-4 bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
                //         <div className="flex items-center gap-4">
                //             <img
                //                 alt="Developer"
                //                 src={searchResult?.photo}
                //                 className="h-16 w-16 rounded-md border dark:border-white border-black object-cover"
                //             />

                //             <div>
                //                 <h3 className="text-neutral-900 dark:text-neutral-300 text-lg font-medium capitalize">{searchResult?.name}</h3>
                //             </div>
                //         </div>

                //         <ul className="mt-4 space-y-1">
                //             <li>
                //                 <span

                //                     className="block h-full rounded-lg border border-gray-700  p-4 hover:border-pink-600"
                //                 >
                //                     <strong className="font-medium text-neutral-900 dark:text-neutral-300">Role</strong>

                //                     <p className="mt-1 capitalize text-xs font-medium  text-neutral-900 dark:text-neutral-300">
                //                         {searchResult?.role}
                //                     </p>
                //                 </span>
                //             </li>
                //             <li>
                //                 <span

                //                     className="block h-full rounded-lg border border-gray-700  p-4 hover:border-pink-600"
                //                 >
                //                     <strong className="font-medium text-neutral-900 dark:text-neutral-300">Email</strong>

                //                     <p className="mt-1 text-xs font-medium  text-neutral-900 dark:text-neutral-300">
                //                         {searchResult?.email}
                //                     </p>
                //                 </span>
                //             </li>
                //             <li>
                //                 <span

                //                     className="block h-full rounded-lg border border-gray-700  p-4 hover:border-pink-600"
                //                 >
                //                     <strong className="font-medium text-neutral-900 dark:text-neutral-300">Phone</strong>

                //                     <p className="mt-1 text-xs font-medium  text-neutral-900 dark:text-neutral-300">

                //                         {
                //                             searchResult?.phone == "" && <p>Your didn't add phone number</p>
                //                         }
                //                     </p>
                //                 </span>
                //             </li>

                //         </ul>
                //     </article>

                // </div>

            }


            <div className="w-10/12 mx-auto rounded-lg border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300  min-w-full divide-y-2 divide-gray-200 text-xs">
                        <thead className="ltr:text-left rtl:text-right ">
                            <tr >
                                <th className="text-neutral-900 dark:text-neutral-300 whitespace-nowrap px-4 py-2 font-medium">
                                    #
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Name
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Photo
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Experience
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Title
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Category
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Status
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Approve
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Reject
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                data?.map((teacherReq, idx) =>

                                    <tr key={teacherReq._id}>
                                        <td className="whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            {idx + 1}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            <Tooltip content={`Teacher name is ${teacherReq?.name}`}>
                                                {teacherReq?.name}

                                            </Tooltip>
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            <img className="w-10 h-10 object-cover" src={teacherReq?.photo} alt="teacher photo" />
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            <Tooltip content={`Experience level is ${teacherReq?.experience}`}>
                                                {teacherReq?.experience}
                                            </Tooltip>
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">{teacherReq?.title}</td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            <Tooltip content={`Category is ${teacherReq?.category}`}>
                                                {teacherReq?.category}
                                            </Tooltip>
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">{teacherReq?.approval}
                                            <Tooltip content={`Status is ${teacherReq?.approval}`}>
                                            </Tooltip>
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            {/* <button
                                                className="group relative inline-block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"
                                                onClick={() => handleApprove(teacherReq)}
                                            >
                                                <span
                                                    className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                                                ></span>
                                                <span
                                                    className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                                                >
                                                    Approve
                                                </span>
                                            </button> */}

                                            <button
                                                className={`group capitalize relative inline-block overflow-hidden border px-8 py-3 focus:outline-none focus:ring ${teacherReq?.approval === 'rejected' ? 'border-gray-400 cursor-not-allowed' : 'border-indigo-600'
                                                    }`}
                                                onClick={() => handleApprove(teacherReq)}
                                                disabled={teacherReq?.approval === 'rejected'}
                                            >
                                                <span
                                                    className={`absolute inset-y-0 left-0 w-[2px] ${teacherReq?.approval === 'rejected' ? 'bg-gray-400' : 'bg-indigo-600'
                                                        } transition-all group-hover:w-full group-active:bg-indigo-500`}
                                                ></span>

                                                <span
                                                    className={`relative text-sm font-medium ${teacherReq?.approval === 'rejected' ? 'text-gray-400'
                                                        : 'text-indigo-600 transition-colors group-hover:text-white'
                                                        }`}
                                                >
                                                    Approve
                                                </span>
                                            </button>


                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-neutral-900">
                                            {/* <button
                                                className="group relative inline-block overflow-hidden border border-red-600 px-4 py-2 focus:outline-none focus:ring"
                                                onClick={() => handleReject(teacherReq)}
                                            >
                                                <span
                                                    className="absolute inset-y-0 right-0 w-[2px] bg-red-600 transition-all group-hover:w-full group-active:bg-red-500"
                                                ></span>
                                                <span
                                                    className="relative text-sm font-medium text-red-600 transition-colors group-hover:text-white"
                                                >
                                                    Reject
                                                </span>
                                            </button> */}

                                            <button
                                                className={`group capitalize relative inline-block overflow-hidden border px-8 py-3 focus:outline-none focus:ring ${teacherReq?.approval !== 'approved' && teacherReq?.approval !== 'pending' ? 'border-gray-400 cursor-not-allowed' : 'border-red-600'
                                                    }`}
                                                onClick={() => handleReject(teacherReq)}
                                                disabled={teacherReq?.approval !== 'approved' && teacherReq?.approval !== 'pending'}
                                            >
                                                <span
                                                    className={`absolute inset-y-0 left-0 w-[2px] ${teacherReq?.approval !== 'approved' && teacherReq?.approval !== 'pending' ? 'bg-gray-400' : 'bg-red-600'
                                                        } transition-all group-hover:w-full group-active:bg-red-500`}
                                                ></span>

                                                <span
                                                    className={`relative text-sm font-medium ${teacherReq?.approval !== 'approved' && teacherReq?.approval !== 'pending'
                                                        ? 'text-gray-400'
                                                        : 'text-red-600 transition-colors group-hover:text-white'
                                                        }`}
                                                >
                                                    Reject
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

export default TeacherRequests;