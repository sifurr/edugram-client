import { Link } from "react-router-dom";
import useMyEnrolledClass from "../../../../hooks/useMyEnrolledClass";
import { Helmet } from "react-helmet-async";




const MyEnroll = () => {

    const { data } = useMyEnrolledClass();

    // console.log("my enrolled class", data?.classes)

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
            <Helmet>
                <title>Edugram | My Enrolled Classes</title>
            </Helmet>
            <section className="">
                <div
                    className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
                >
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">My Enrolled Classes</h2>

                        <p className="mt-4 ">
                            Focus on regular studies
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {
                            data?.classes?.map(classInfo =>
                                <div key={classInfo._id}
                                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-indigo-500/10 hover:shadow-indigo-500/10"
                                    to="/"
                                >
                                    <img src={classInfo?.image} alt="" />
                                    <h2 className="mt-4 text-xl font-bold">{classInfo?.title}</h2>

                                    <p className="mt-1 text-sm ">
                                        <b>Posted by:  </b> {classInfo?.name}
                                    </p>

                                    <div className="mt-12 text-center">

                                        <Link 
                                        to={`/dashboard/myenroll-class/${classInfo._id}`}
                                            className="group relative inline-block overflow-hidden border border-indigo-500 px-4 py-2 focus:outline-none focus:ring"

                                        >
                                            <span
                                                className="absolute inset-y-0 left-0 w-[2px] bg-indigo-500 transition-all group-hover:w-full group-active:bg-indigo-500"
                                            ></span>
                                            <span
                                                className="relative text-sm font-medium text-indigo-500 transition-colors group-hover:text-white"
                                            >
                                                Continue
                                            </span>
                                        </Link>
                                    </div>

                                </div>

                            )
                        }


                    </div>


                </div>
            </section>
        </div>
    );
};

export default MyEnroll;