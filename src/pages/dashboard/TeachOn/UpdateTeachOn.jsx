import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useMyTeachingRequest from "../../../hooks/useMyTeachingRequest";


const UpdateTeachOn = () => {
    const { data } = useMyTeachingRequest();    
    // console.log("My teaching req: ----> ", data)   

    return (
        <div className="dark:bg-[#000927] bg-gray-50 text-neutral-900 dark:text-neutral-300">
            <Helmet>
                <title>Edugram | My Request</title>
            </Helmet>
            <h2 className='text-3xl text-center my-10'>Teach On Edugram</h2>
            <div>
                        <section>
                            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                                    <div className="lg:col-span-2 lg:py-12">
                                        <p className="max-w-xl text-lg">
                                            Welcome to Edugram!
                                            <br />
                                        </p>

                                        <div className="mt-8">
                                            <Link to="#" className="text-2xl font-bold ">
                                                <span>
                                                    Your request status: <span className="text-xl uppercase text-indigo-600">{data?.approval}</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                 {/* TODO: add the button based on the pending status */}

                                </div>
                            </div>
                        </section>  
            </div >
        </div >
    );
};

export default UpdateTeachOn;