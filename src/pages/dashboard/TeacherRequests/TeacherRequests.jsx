import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useTeacherRequest from "../../../hooks/useTeacherRequest";



const TeacherRequests = () => {

    const { data, refetch, isLoading } = useTeacherRequest();
    // category  email experience name photo requestMade requestedTime  title    

    console.log(data)

    return (
        <div>
            <Helmet>
                <title>Edugram | Teacher Requests</title>
            </Helmet>
            <h2 className='text-3xl text-center mt-20 mb-10'>Teacher Requests</h2>

            <div className="w-10/12 mx-auto rounded-lg border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="dark:bg-[#000927] bg-gray-50  min-w-full divide-y-2 divide-gray-200 text-xs">
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
                                            {teacherReq?.name}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            <img className="w-10 h-10 object-cover" src={teacherReq?.photo} alt="teacher photo" />
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            {teacherReq?.experience}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">{teacherReq?.title}</td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 font-medium text-neutral-900 dark:text-neutral-300">
                                            {teacherReq?.category}
                                        </td>
                                        <td className="capitalize whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">{teacherReq?.approval}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-neutral-900 dark:text-neutral-300">
                                            <Link
                                                className="group relative inline-block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"
                                                to="/"
                                            >
                                                <span
                                                    className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                                                ></span>
                                                <span
                                                    className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                                                >
                                                    Approve
                                                </span>
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-neutral-900">
                                            <Link
                                                className="group relative inline-block overflow-hidden border border-red-600 px-4 py-2 focus:outline-none focus:ring"
                                                to="/"
                                            >
                                                <span
                                                    className="absolute inset-y-0 right-0 w-[2px] bg-red-600 transition-all group-hover:w-full group-active:bg-red-500"
                                                ></span>

                                                <span
                                                    className="relative text-sm font-medium text-red-600 transition-colors group-hover:text-white"
                                                >
                                                    Reject
                                                </span>
                                            </Link>
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