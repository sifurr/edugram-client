import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Sidebar from "../pages/shared/Sidebar/Sidebar";

        
const DashboardLayout = () => {
    return (
        
        // <div className="flex min-h-screen dark:bg-[#000927] bg-gray-50 text-neutral-900 dark:text-neutral-300">
        //     <Helmet>
        //         <title>Edugram | Dashboard</title>
        //     </Helmet>
        //     <Sidebar />
        //     <div className="dark:bg-[#000927] bg-gray-50 flex-1">
        //         <Outlet />
        //     </div>
        // </div>

        <div className="flex flex-row h-screen dark:bg-[#000927] bg-gray-50 w-screen text-neutral-900 dark:text-neutral-300 overflow-hidden">
            <Sidebar></Sidebar>
            <div className="flex flex-col flex-1 dark:bg-[#000927] bg-gray-5">                
                <div className="flex-1 overflow-auto p-4">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;