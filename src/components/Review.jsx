import ReactStars from "react-rating-stars-component";


const Review = ({ feedbacks }) => {   

    return (
        <div>
            <section className="">
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <h2
                        className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-neutral-300 uppercase sm:text-3xl"
                    >
                        Feedbacks from the students
                    </h2>

                    <div
                        className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8"
                    >
                        {
                            feedbacks?.map(feedback =>

                                <div key={feedback._id} className="mb-8 sm:break-inside-avoid dark:bg-gray-600  shadow-lg">
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

                                        <p className="mt-4 dark:text-neutral-300">
                                            {feedback?.description}
                                        </p>
                                    </blockquote>
                                </div>

                            )

                        }


                    </div>
                </div>
            </section>
        </div>
    );
};

export default Review;