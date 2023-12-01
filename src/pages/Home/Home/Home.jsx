import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import NewsLetter from "./NewsLetter";
import Partners from "./Partners";
import RecommendedClasses from "./RecommendedClasses";
import Testimonials from "./Testimonials";
import Fac from "./Faq";
import Stats from "./Stats";
import JoinAsTeacher from "./JoinAsTeacher";



const Home = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
            <Helmet>
                <title>Edugram | Home</title>
            </Helmet>
            <Banner />
            
            <div className="shadow-xl py-5">
                <Partners />
            </div>
            <div className="shadow-xl py-10 my-10">
                <RecommendedClasses />
            </div>
            <div className="shadow-xl py-10 my-10">
                <Testimonials />
            </div>
            <div className="shadow-xl py-10 my-10">
                <Stats />
            </div>

            <div className="shadow-xl py-10 my-10">
                <JoinAsTeacher />
            </div>
            {/* Extra two sections */}
            <div className="shadow-xl py-10 my-10">
                <Fac />
            </div>
            <div className="shadow-xl py-10 my-10">
                <NewsLetter />
            </div>


            

        </div>
    );
};

export default Home;