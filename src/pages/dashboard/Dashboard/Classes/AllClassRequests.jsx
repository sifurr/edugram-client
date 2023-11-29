import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";



const AllClassRequests = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    const { data, refetch } = useQuery({
        queryKey: ['classRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/v1/users/classes-requests", { withCredentials: true })
            return res.data;
        }
    })

    console.log("all classes", data)

    const handleApprove = classReq => {

        const reqStatus = {
            status: "approved"
        }

        Swal.fire({
            title: "Approve the class?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"

        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`api/v1/users/class-status/${classReq._id}`, reqStatus, { withCredentials: true })
                    .then(res => {
                        // console.log("make teacher res -->",res)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: `Class has been approved`,
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

        // console.log("teacher id: ", classReq._id)
    }

    const handleReject = classReq => {

        const reqStatus = {
            status: "rejected"
        }

        Swal.fire({
            title: "Reject the class?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/api/v1/users/class-status/${classReq._id}`, reqStatus, { withCredentials: true })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: `Class has been rejected`,
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

        // console.log("teacher id: ", classReq._id)
    }

    const handleProgress = classReq => {
        console.log("progress clicked")
        navigate(`/dashboard/class-progress/${classReq._id}`)
    }

    return (
        <div>
            <Helmet>
                <title>Edugram | All Classes Requests</title>
            </Helmet>
            <h2 className='text-3xl text-center mt-20 mb-10 capitalize'>Requests of All the Classes</h2>

            <div className="w-10/12 mx-auto rounded-lg border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="dark:bg-[#000927] bg-gray-50  min-w-full divide-y-2 divide-gray-200 text-xs">
                        <thead className="ltr:text-left rtl:text-right ">
                            <tr >
                                <th className="text-neutral-900 dark:text-neutral-300 whitespace-nowrap px-4 py-2 font-medium">
                                    #
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Title
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Image
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Email
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Short Description
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
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Progress
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                data?.map((classReq, idx) =>

                                    <tr key={classReq._id}>
                                        <td className="whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            {idx + 1}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            {classReq?.title}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            <img className="w-10 h-10 object-cover" src={classReq?.image} alt="teacher photo" />
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            {classReq?.email}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">{classReq?.description}</td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300 ">{classReq?.status}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            <button
                                                className="group relative inline-block overflow-hidden border border-green-500 px-4 py-2 focus:outline-none focus:ring"
                                                onClick={() => handleApprove(classReq)}
                                            >
                                                <span
                                                    className="absolute inset-y-0 left-0 w-[2px] bg-green-500 transition-all group-hover:w-full group-active:bg-green-500"
                                                ></span>
                                                <span
                                                    className="relative text-sm font-medium text-green-500 transition-colors group-hover:text-white"
                                                >
                                                    Approve
                                                </span>
                                            </button>
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-neutral-900">
                                            <button
                                                className="group relative inline-block overflow-hidden border border-red-600 px-4 py-2 focus:outline-none focus:ring"
                                                onClick={() => handleReject(classReq)}
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
                                        <td className="whitespace-nowrap px-2 py-2 text-neutral-900">
                                            <button
                                                className={`group capitalize relative inline-block overflow-hidden border px-8 py-3 focus:outline-none focus:ring ${classReq?.status !== 'approved' ? 'border-gray-400 cursor-not-allowed' : 'border-indigo-600'
                                                    }`}
                                                onClick={() => handleProgress(classReq)}
                                                disabled={classReq?.status !== 'approved'}
                                            >
                                                <span
                                                    className={`absolute inset-y-0 left-0 w-[2px] ${classReq?.status !== 'approved' ? 'bg-gray-400' : 'bg-indigo-600'
                                                        } transition-all group-hover:w-full group-active:bg-indigo-500`}
                                                ></span>

                                                <span
                                                    className={`relative text-sm font-medium ${classReq?.status !== 'approved'
                                                        ? 'text-gray-400'
                                                        : 'text-indigo-600 transition-colors group-hover:text-white'
                                                        }`}
                                                >
                                                    See Progress
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

export default AllClassRequests;