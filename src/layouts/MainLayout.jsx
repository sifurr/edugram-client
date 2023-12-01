import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer";




const MainLayout = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <Navbar></Navbar>
            <div className="mt-12">
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    );

};

export default MainLayout;