import { Helmet } from "react-helmet-async";
import useTeacherRequest from "../../../hooks/useTeacherRequest";
import Swal from "sweetalert2";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Tooltip } from 'flowbite-react';






const TeacherRequests = () => {

    const { data, refetch } = useTeacherRequest();
    // category  email experience name photo requestMade requestedTime  title   

    const axiosPublic = useAxiosPublic();

    console.log(data)

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
                                            <button
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
                                            </button>
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-neutral-900">
                                            <button
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