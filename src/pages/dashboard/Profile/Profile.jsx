/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import { Helmet } from "react-helmet-async";


const Profile = () => {
    const { user } = useAuth();
    const { data, refetch, isLoading } = useUser([]);

    if (isLoading) {
        return <Spinner />
    }

    // console.log("user info from profile--->", data);

    return (
        <div className="w-1/3 min-h-screen flex items-center mx-auto">

            <Helmet>
                <title>Edugram | Profile</title>
            </Helmet>
            <article className="rounded-xl dark:border border-2  p-4 bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
                <div className="flex items-center gap-4">
                    <img
                        alt="Developer"
                        src={user?.photoURL}
                        className="h-16 w-16 rounded-md border dark:border-white border-black object-cover"
                    />

                    <div>
                        <h3 className="text-neutral-900 dark:text-neutral-300 text-lg font-medium capitalize">{user?.displayName}</h3>
                    </div>
                </div>

                <ul className="mt-4 space-y-2">
                    <li>
                        <span

                            className="block h-full rounded-lg border border-gray-700  p-4 hover:border-pink-600"
                        >
                            <strong className="font-medium text-neutral-900 dark:text-neutral-300">Role</strong>

                            <p className="mt-1 capitalize text-xs font-medium  text-neutral-900 dark:text-neutral-300">
                                {data.user?.role}
                            </p>
                        </span>
                    </li>
                    <li>
                        <span

                            className="block h-full rounded-lg border border-gray-700  p-4 hover:border-pink-600"
                        >
                            <strong className="font-medium text-neutral-900 dark:text-neutral-300">Email</strong>

                            <p className="mt-1 text-xs font-medium  text-neutral-900 dark:text-neutral-300">
                                {user?.email}
                            </p>
                        </span>
                    </li>
                    <li>
                        <span

                            className="block h-full rounded-lg border border-gray-700  p-4 hover:border-pink-600"
                        >
                            <strong className="font-medium text-neutral-900 dark:text-neutral-300">Phone</strong>

                            <p className="mt-1 text-xs font-medium  text-neutral-900 dark:text-neutral-300">

                                {
                                    data.user?.phone == "" ?
                                        <>
                                            <p className="mb-3">You haven't added your phone number yet!</p>
                                            <Link
                                                to={`/dashboard/add-phone/${data.user?._id}`}
                                                className="group relative inline-block overflow-hidden border border-indigo-500 px-4 py-2 focus:outline-none focus:ring"

                                            >
                                                <span
                                                    className="absolute inset-y-0 left-0 w-[2px] bg-indigo-500 transition-all group-hover:w-full group-active:bg-indigo-500"
                                                ></span>
                                                <span
                                                    className="relative text-sm font-medium text-indigo-500 transition-colors group-hover:text-white"
                                                >
                                                    Add Phone
                                                </span>
                                            </Link>
                                        </>

                                        :
                                        data.user?.phone


                                }
                            </p>
                        </span>
                    </li>

                </ul>
            </article>
        </div>
    );
};

export default Profile;