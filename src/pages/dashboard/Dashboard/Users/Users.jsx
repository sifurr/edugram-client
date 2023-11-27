import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const Users = () => {
    const axiosPublic = useAxiosPublic();
    // console.log("is admin", isAdmin);

    const { data, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/v1/users", { withCredentials: true })
            return res.data;
        }
    })

    // console.log("data: userInfos ---> ", data)

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Change user to Admin?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/api/v1/users/make-admin/${user._id}`, null, { withCredentials: true })
                    .then(res => {
                        if (res.data.success) {
                            refetch();
                            Swal.fire({
                                title: `${user.name} is now an admin`,
                                text: "",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                title: res.data.message,
                                icon: "error",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });

        // console.log("user: ", user._id)
    }



    return (
        <div>
            <Helmet>
                <title>Edugram | All Users</title>
            </Helmet>
            <h2 className='text-3xl text-center mt-20 mb-10 uppercase'>All Users</h2>

            {/* Search Button */}
            <div className="mb-4 flex justify-center">
                <form>

                    <input
                        type="text"
                        name="searchText"
                        placeholder="Search by username or email"
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-600 text-neutral-900"
                        
                    />
                    <button
                        className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md focus:outline-none focus:ring"
                        
                    >
                        Search
                    </button>
                </form>
            </div>

            <div className="w-10/12 mx-auto rounded-lg border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="dark:bg-[#000927] bg-gray-50  min-w-full divide-y-2 divide-gray-200 text-xs">
                        <thead className="ltr:text-left rtl:text-right ">
                            <tr>
                                <th className="text-neutral-900 dark:text-neutral-300 whitespace-nowrap px-4 py-2 font-medium">
                                    #
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Name
                                </th>
                                <th className="capitalize  whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Email
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Image
                                </th>
                                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                    Make Admin
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                data?.map((userInfo, idx) =>

                                    <tr key={userInfo._id}>
                                        <td className="text-center whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            {idx + 1}
                                        </td>
                                        <td className="text-center capitalize whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            {userInfo?.name}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            {userInfo?.email}
                                        </td>
                                        <td className="flex justify-center capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            <img className="w-10 h-10 object-cover" src={userInfo?.photo} alt="teacher photo" />
                                        </td>

                                        <td className="whitespace-nowrap  px-2 py-2 text-center text-neutral-900 dark:text-neutral-300">

                                            <button
                                                className={`group relative inline-block overflow-hidden border px-8 py-3 focus:outline-none focus:ring ${userInfo.role === 'admin' ? 'border-gray-400 cursor-not-allowed' : 'border-indigo-600'
                                                    }`}
                                                onClick={() => handleMakeAdmin(userInfo)}
                                                disabled={userInfo.role === 'admin'}
                                            >
                                                <span
                                                    className={`absolute inset-y-0 left-0 w-[2px] ${userInfo.role === 'admin' ? 'bg-gray-400' : 'bg-indigo-600'
                                                        } transition-all group-hover:w-full group-active:bg-indigo-500`}
                                                ></span>

                                                <span
                                                    className={`relative text-sm font-medium ${userInfo.role === 'admin'
                                                        ? 'text-gray-400'
                                                        : 'text-indigo-600 transition-colors group-hover:text-white'
                                                        }`}
                                                >
                                                    Make Admin
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

export default Users;