import { Link, NavLink } from "react-router-dom";
import Switcher from "../../../components/Switcher/Switcher"
import {
    BookCheck,
    BookUp2,
    ChevronFirst,
    ChevronLast,
    Contact,
    LibrarySquare,
    LogOut,
    Shield,
    User,
    Users
} from "lucide-react";

import { useState } from "react";
import logo from '../../../assets/edugram-logo.png'
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import useUser from "../../../hooks/useUser";

const Sidebar = () => {
    const { user, logOut } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { data, refetch, isLoading } = useUser([]);

    if (isLoading) {
        return <Spinner />
    }

    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logged out successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                Swal.fire({
                    title: `Something is wrong!, ${err}`,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
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

                        {
                            data?.user?.role === "student" &&
                            <>
                                <li>
                                    <NavLink to="/dashboard/my-enroll-class" className="flex gap-3">
                                        <Contact />
                                        <span
                                            className={`${!sidebarOpen && "hidden"}`}>
                                            My Enroll Class
                                        </span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/update-teacher-request" className="flex gap-3">
                                        <Shield />
                                        <span
                                            className={`${!sidebarOpen && "hidden"}`}>
                                            My Teaching Request
                                        </span>
                                    </NavLink>
                                </li>
                            </>
                        }
                        {
                            data?.user?.role === "teacher" &&
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-class" className="flex gap-3">
                                        <BookUp2 />
                                        <span
                                            className={`${!sidebarOpen && "hidden"}`}>
                                            Add Class
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-class" className="flex gap-3">
                                        <BookCheck />
                                        <span
                                            className={`${!sidebarOpen && "hidden"}`}>
                                            My Class
                                        </span>
                                    </NavLink>
                                </li>                                
                            </>
                        }
                        {
                            data?.user?.role === "admin" &&
                            <>
                                <li>
                                    <NavLink to="/dashboard/teacher-request" className="flex gap-3">
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
                            </>
                        }

                        <li>
                            <NavLink to="/dashboard/profile" className="flex gap-3">
                                <User />
                                <span
                                    className={`${!sidebarOpen && "hidden"}`}>
                                    Profile
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={handleLogout} to="/" className="flex gap-3">
                                <LogOut />
                                <span
                                    className={`${!sidebarOpen && "hidden"}`}>
                                    Logout
                                </span>
                            </NavLink>
                        </li>
                    </div>

                </ul>
            </div >
            <div className="mb-10">
                <div className="flex gap-3 justify-center items-center">
                    <img className={!sidebarOpen ? 'w-8 h-8 object-cover' : 'w-10 h-10 object-cover'} src={user?.photoURL} alt="" />
                    <div className={`${!sidebarOpen && "hidden"}`}>
                        <h5 className="text-xs" >{user.displayName}</h5>
                        <span className="text-xs" >{user.email}</span>
                    </div>
                </div>
            </div>
        </nav >

    );
};

export default Sidebar;