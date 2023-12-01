import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
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

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
            <Helmet>
                <title>Edugram | Home</title>
            </Helmet>
            <Banner />

            <div data-aos="fade-left" data-aos-offset="300"
                data-aos-easing="ease-in-sine" className="shadow-xl py-5">
                <Partners />
            </div>
            <div data-aos="fade-right" data-aos-offset="300"
                data-aos-easing="ease-in-sine" className="shadow-xl py-10 my-10">
                <RecommendedClasses />
            </div>
            <div data-aos="fade-up" data-aos-offset="300"
                data-aos-easing="ease-in-sine" data-aos-anchor-placement="top-bottom" className="shadow-xl py-10 my-10">
                <Testimonials />
            </div>
            <div data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine" className="shadow-xl py-10 my-10">
                <Stats />
            </div>

            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" className="shadow-xl py-10 my-10">
                <JoinAsTeacher />
            </div>
            {/* Extra two sections */}
            <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" className="shadow-xl py-10 my-10">
                <Fac />
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" className="shadow-xl py-10 my-10">
                <NewsLetter />
            </div>




        </div>
    );
};

export default Home;