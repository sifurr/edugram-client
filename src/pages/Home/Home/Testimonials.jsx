import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import ReactStars from "react-rating-stars-component";
import Spinner from '../../../components/Spinner';


const Testimonials = () => {
    const axiosPublic = useAxiosPublic()

    const { data: feedbacks, isLoading} = useQuery({
        queryKey: ["feedbacksForAll"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/users/all-feedbacks`);
            return res.data;
        }
    });

    console.log("feedbacks", feedbacks)


    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "free",
        slides: {
            perView: 4,
            spacing: 15,
        },
    })

    if(isLoading)
    {
        return <Spinner/>
    }

    return (
        <section className='mx-20'>            
            <h2 className="font-bold text-xl lg:text-2xl p-4 text-center mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">                          
                            <span className="text-4xl lg:text-7xl font-black uppercase">Testimonials</span>
                        </h2>            
                <div ref={sliderRef} className="keen-slider">
                    {
                        feedbacks?.map(feedback =>
                            <div key={feedback._id} className="keen-slider__slide shadow-lg">
                                <div className="my-8 sm:break-inside-avoid dark:bg-gray-600  shadow-lg">
                                    <blockquote className="rounded-lg p-6 shadow-sm sm:p-8">
                                        <div className="flex items-center  gap-4">
                                            <img
                                                alt="photo"
                                                src={feedback?.studentImage}
                                                className="h-14 w-14 rounded-full object-cover"
                                            />

                                            <div>
                                                <div className="flex justify-center gap-0.5">
                                                    <ReactStars
                                                        count={5}
                                                        value={feedback?.rating}
                                                        size={24}
                                                        edit={false}

                                                    />
                                                </div>

                                                <p className="mt-0.5 text-lg font-medium text-gray-900">{feedback?.studentName}</p>
                                            </div>
                                        </div>

                                        <p className="mt-4 dark:text-neutral-300 capitalize font-bold">
                                            {feedback?.classTitle}
                                        </p>
                                        <p className="mt-4 dark:text-neutral-300">
                                            {feedback?.description}
                                        </p>
                                    </blockquote>
                                </div>

                            </div>
                        )
                    }
                </div>
           
        </section>
    );
};

export default Testimonials;
