import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Tooltip } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useState } from "react";


const Users = () => {
    const [searchResult, setSearchResult] = useState({});
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    // console.log("is admin", isAdmin);

    const { data, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/v1/users", { withCredentials: true })
            return res.data;
        }
    })


    const onSubmit = async (data) => {

        const searchText = data.searchTerm;

        console.log("search text-->", searchText)

        const res = await axiosPublic.get(`/api/v1/users/find?search=${searchText}`, { withCredentials: true })
        setSearchResult(res.data);
        reset()
        // console.log("search result 1-->", searchResult)

    }

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


            }


            {/* ======================================= */}


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
                                            <Tooltip content={`${userInfo?.name}`}>
                                                {userInfo?.name}
                                            </Tooltip>
                                        </td>
                                        <td className="text-center whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            <Tooltip content={`${userInfo?.email}`}>
                                                {userInfo?.email}
                                            </Tooltip>
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