import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Spinner from "../../../components/Spinner";
import { BookAIcon, BookOpen, Group, LucideGroup, Users } from "lucide-react";


const Stats = () => {

    const axiosPublic = useAxiosPublic()

    const { data: statistics, isLoading } = useQuery({
        queryKey: ["statistics"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/statistics`);
            return res.data;
        }
    });

    if (isLoading) {
        return <Spinner />
    }

    // console.log("statis", statistics)


    return (
        <section className="drop-shadow-lg">
            <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">

                    <div className="relative flex items-center">
                        <span
                            className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-600"
                        ></span>

                        <div>
                            <section className="bg-gray-50  dark:bg-gray-900 text-neutral-900 dark:text-neutral-300 rounded-md">
                                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                                    <div className="mx-auto max-w-3xl text-center">
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                                            Discover Our Numbers
                                        </h2>
                                        <h2 className="font-bold text-xl lg:text-2xl p-4 text-center mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">                          
                            <span className="text-4xl lg:text-7xl font-black uppercase">Discover Our Numbers</span>
                        </h2>   

                                        <p className="mt-4 text-gray-500 dark:text-gray-400 sm:text-xl">
                                            Explore user engagement, class diversity, and enrollment stats. Join us in shaping a vibrant learning environment!
                                        </p>
                                    </div>

                                    <div className="mt-8 sm:mt-12">
                                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div
                                                className="flex flex-col rounded-lg border border-gray-300 shadow-lg px-4 py-8 text-center dark:border-gray-800"
                                            >
                                                <dt
                                                    className="order-last text-lg font-medium text-gray-500 dark:text-gray-400"
                                                >
                                                    Total Users                                                    
                                                </dt>

                                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                                                    {statistics?.totalUsers}
                                                </dd>
                                            </div>

                                            <div
                                                className="flex flex-col rounded-lg border border-gray-300 shadow-lg px-4 py-8 text-center dark:border-gray-800"
                                            >
                                                <dt
                                                    className="order-last text-lg font-medium text-gray-500 dark:text-gray-400"
                                                >
                                                    Total Classes                                                    
                                                </dt>

                                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{statistics?.totalClasses}</dd>
                                            </div>

                                            <div
                                                className="flex flex-col rounded-lg border border-gray-300 shadow-lg px-4 py-8 text-center dark:border-gray-800"
                                            >
                                                <dt
                                                    className="order-last text-lg font-medium text-gray-500 dark:text-gray-400"
                                                >
                                                    Total Enrollment
                                                    
                                                </dt>

                                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{statistics?.totalEnrollments}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>



                    <div className="relative z-10 lg:py-16">
                        <div className="relative h-64 sm:h-80 lg:h-full">
                            <img
                                alt="statistics"
                                src="https://i.ibb.co/17NNCRc/topic-statistics.jpg"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
