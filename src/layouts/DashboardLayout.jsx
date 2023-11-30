import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Sidebar from "../pages/shared/Sidebar/Sidebar";

        
const DashboardLayout = () => {
    return (
                <div className="flex flex-row h-screen bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300 w-screen  overflow-hidden">
            <Sidebar></Sidebar>
            <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">                
                <div className="flex-1 overflow-auto p-4">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;