import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Spinner from "../../../components/Spinner";


const Faq = () => {
    const axiosPublic = useAxiosPublic();
    const { data: faqs, isLoading } = useQuery({
        queryKey: ['faqs'],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/v1/faqs")
            return res.data;
        }
    })

    if (isLoading) {
        return <Spinner />
    }
    
    return (
        <div>
            <div className="space-y-4 w-2/3 mx-auto">                
                <h2 className="font-bold text-xl lg:text-2xl p-4 text-center mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">                          
                            <span className="text-4xl lg:text-7xl font-black uppercase">faq</span>
                        </h2> 

                {
                    faqs?.map(faq =>

                        <details key={faq._id}
                            className="group border-s-4 border-indigo-600 bg-gray-50 p-6 dark:bg-gray-900 [&_summary::-webkit-details-marker]:hidden"

                        >
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                    {faq?.question}
                                </h2>

                                <span
                                    className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 dark:bg-gray-800 dark:text-white sm:p-3"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-200">
                                {faq?.answer}
                            </p>
                        </details>

                    )
                }


            </div>
        </div>
    );
};

export default Faq;