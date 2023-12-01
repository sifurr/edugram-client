import { Link } from "react-router-dom";


const JoinAsTeacher = () => {
    return (
        <div className="">
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-bold text-xl lg:text-2xl p-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
                            Empower Minds, Ignite Futures <br/> 
                            <span className="text-4xl lg:text-7xl font-black uppercase">Join as a Teacher!</span>
                        </h2>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                            <img
                                alt="join as a teacher"
                                src="https://i.ibb.co/936R3nd/e-learning-app.jpg"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>

                        <div className="lg:py-16">
                            <article className="space-y-4 text-gray-500 dark:text-gray-300 ">
                                <p>
                                    Unleash your expertise, inspire the next generation, and be a catalyst for change! Join our dynamic community of educators shaping the future of tech education.
                                </p>

                                <p>
                                    Whether you're a coding maestro or a tech aficionado, become a guiding force in the world of online learning. Together, let's empower minds and ignite a passion for technology!
                                </p>
                            </article>
                            <Link 
                            to={"/teach-on"}
                                className="group relative mt-6 inline-block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"

                            >
                                <span
                                    className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-600"
                                ></span>
                                <span
                                    className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                                >
                                    Join as a Teacher
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JoinAsTeacher;