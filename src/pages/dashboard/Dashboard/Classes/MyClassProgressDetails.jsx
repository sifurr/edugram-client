import { PlusCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


const MyClassProgressDetails = () => {
    return (
        <div>
            <Helmet>
                <title>Edugram | My Class Progress Details</title>
            </Helmet>
            <h2 className='text-3xl text-center'>My Class Progress Details</h2>

            <div>
                <section className="dark:bg-[#000927] bg-gray-50">
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
                                        80
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
                                        6
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
                                        66
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>
                <section className="w-4/12 mx-auto">
                    <Link
                        className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
                        to="#"
                    >
                        <span
                            className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
                        >
                            Create Assignment
                        </span>

                        <span
                            className="shrink-0 rounded-full border border-current bg-white text-indigo-600 group-active:text-indigo-500"
                        >
                            <PlusCircle size={40}/>
                            
                        </span>
                    </Link>
                </section>
            </div>

        </div>
    );
};

export default MyClassProgressDetails;