import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";


const Class = ({ classInfo, refetch }) => {

    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();

    const handleDeleteItem = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, delete ${item.title}`
        }).then(async (result) => {
            if (result.isConfirmed) {
                // const res = await axiosPublic.delete(`/menu/${item._id}`);
                const res = await axiosPublic.delete(`/api/v1/users/classes/${item._id}`, { withCredentials: true });

                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `Class has been deleted.`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500

                    });
                }
            }
        });

    }

    const handleProgress = classReq => {
        console.log("progress clicked")
        navigate(`/dashboard/my-class/${classReq._id}`)
    }


    return (
        <div>
            <div className="relative block overflow-hidden">
                <button
                    className="absolute end-4 top-4 z-10 rounded-lg bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
                >
                    <span className="">${classInfo?.price}</span>
                </button>

                <img
                    src={classInfo?.image}
                    alt="class image"
                    className="h-32 md:40 lg:h-64 w-full object-cover transition duration-500 hover:scale-105 sm:h-72"
                />

                <div className="relative border border-gray-100 bg-white p-6">
                    <div>
                        <Link to={`/dashboard/update-class/${classInfo?._id}`}
                            className="group relative inline-block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"
                        >
                            <span
                                className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                            ></span>
                            <span
                                className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                            >
                                Update
                            </span>
                        </Link>

                        <span
                            onClick={() => handleDeleteItem(classInfo)}
                            className="ml-3 group relative inline-block overflow-hidden border border-red-600 px-4 py-2 focus:outline-none focus:ring"
                        >
                            <span
                                className="absolute inset-y-0 right-0 w-[2px] bg-red-600 transition-all group-hover:w-full group-active:bg-red-500"
                            ></span>
                            <span
                                className="relative text-sm font-medium text-red-600 transition-colors group-hover:text-white"
                            >
                                Delete
                            </span>
                        </span>

                    </div>

                    <h3 className="mt-4 text-lg font-medium text-gray-900 capitalize">{classInfo?.title}</h3>

                    <p className="mt-1.5 text-sm text-gray-700 capitalize">Status: {classInfo?.status}</p>
                    <p className="mt-1.5 text-sm text-gray-700 capitalize">{classInfo?.description}</p>


                    <button
                        className={`group w-full capitalize relative inline-block overflow-hidden border px-8 py-3 focus:outline-none focus:ring ${classInfo?.status !== 'approved' ? 'border-gray-400 cursor-not-allowed' : 'border-indigo-600'
                            }`}
                        onClick={() => handleProgress(classInfo)}
                        disabled={classInfo?.status !== 'approved'}
                    >
                        <span
                            className={`absolute inset-y-0 left-0 w-[2px] ${classInfo?.status !== 'approved' ? 'bg-gray-400' : 'bg-indigo-600'
                                } transition-all group-hover:w-full group-active:bg-indigo-500`}
                        ></span>

                        <span
                            className={`relative text-sm font-medium ${classInfo?.status !== 'approved'
                                ? 'text-gray-400'
                                : 'text-indigo-600 transition-colors group-hover:text-white'
                                }`}
                        >
                            Details
                        </span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Class;