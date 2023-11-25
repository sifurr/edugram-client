import { Link, NavLink } from "react-router-dom";
import Switcher from "../../../components/Switcher/Switcher"
import {    
    ChevronFirst, 
    ChevronLast,    
    Contact,
    LibrarySquare,
    User,
    Users} from "lucide-react";

import { useState } from "react";    
import logo from '../../../assets/edugram-logo.png'    
import useAuth from "../../../hooks/useAuth";
        
const Sidebar = () => {
    const {user} = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (        
            <nav className={`${sidebarOpen ? "lg:w-60" : "w-14"} transition-all flex flex-col border-r overflow-hidden`}>
                <div className="flex-1 relative">
                    <div className="absolute right-4 top-4 cursor-pointer">
                        {
                            sidebarOpen ?
                                <div onClick={handleSidebar}><ChevronFirst /></div>
                                :
                                <div onClick={handleSidebar}><ChevronLast /></div>
                        }
                    </div>
                    <div className="mt-16 mb-5 flex justify-center w-full">
                        <Switcher />
                    </div>
                    <div className="mb-10 mt-8">
                        <Link to="/" className="flex flex-col gap-4 items-center">
                            <img className="dark:bg-white rounded-full w-10 h-10" src={logo} alt="" />
                            <h3 className={`${!sidebarOpen && "hidden"} text-2xl font-bold`}>Edugram</h3>
                        </Link>
                    </div>
                    <ul className="flex flex-col items-center">
                        <div className="space-y-3">
                            <li>
                                <NavLink to="/teacher-request" className="flex gap-3">
                                    <Contact />
                                    <span
                                        className={`${!sidebarOpen && "hidden"}`}>
                                        Teacher Request
                                    </span>
                                </NavLink>
                            </li>                           
                            <li>
                                <NavLink to="/users" className="flex gap-3">
                                    <Users />
                                    <span
                                        className={`${!sidebarOpen && "hidden"}`}>
                                        Users
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/all-classes" className="flex gap-3">
                                    <LibrarySquare />
                                    <span
                                        className={`${!sidebarOpen && "hidden"}`}>
                                        All Classes
                                    </span>
                                </NavLink>

                            </li>
                            <li>
                                <NavLink to="/profile" className="flex gap-3">
                                    <User />
                                    <span
                                        className={`${!sidebarOpen && "hidden"}`}>
                                        Profile
                                    </span>
                                </NavLink>
                            </li>
                        </div>

                    </ul>
                </div>
                <div className="mb-10">
                    <div className="flex gap-3 justify-center items-center">
                        <img className={!sidebarOpen ? 'w-8 h-8 object-cover' : 'w-10 h-10 object-cover'} src={user?.photoURL} alt="" />                        
                        <div className={`${!sidebarOpen && "hidden"}`}>
                            <h5>{user.displayName}</h5>
                            <span>{user.email}</span>
                        </div>
                    </div>
                </div>
            </nav>
        
    );
};

export default Sidebar;