import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/Sidebar/Sidebar";
import { Helmet } from "react-helmet-async";

        
const Dashboard = () => {
    return (
        <div className="flex min-h-screen dark:bg-[#000927] bg-gray-50 text-neutral-900 dark:text-neutral-300">
            <Helmet>
                <title>Edugram | Dashboard</title>
            </Helmet>
            <Sidebar />
            <div className="dark:bg-[#000927] bg-gray-50 flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;