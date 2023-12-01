import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/edugram-logo.png'
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import Switcher from '../../../components/Switcher/Switcher';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useState } from 'react';
import { AlignRight } from 'lucide-react';
import useTeacher from '../../../hooks/useTeacher';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const axiosPublic = useAxiosPublic()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTeacher, isTeacherLoading] = useTeacher();
    console.log("isTeacher", isTeacher)



    const handleLogout = () => {
        logOut()
            .then(() => {

                clearToken();

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


    const clearToken = async () => {
        const response = await axiosPublic.post('/api/v1/auth/logout');
        return response.data;
    };

    return (
        <nav className="p-4 navbar bg-gray-50 drop-shadow-lg dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img className="w-10 h-10 dark:bg-neutral-300 rounded-full mr-2" src={logo} alt="Edugram Logo" />
                    {/* <Link to="/" className="dark:text-neutral-300 text-neutral-900 text-lg font-bold">
                        Edugram
                    </Link> */}
                    <Link to="/" className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-3xl font-black uppercase">                          
                            Edugram
                        </Link> 
                </div>
                <div className='lg:hidden'>
                    <Switcher />
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-4">
                        <ul className="flex items-center space-x-4">
                            <li>
                                <Link to="/" className="text-neutral-900 dark:text-neutral-300 hover:text-gray-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/classes" className="text-neutral-900 dark:text-neutral-300 hover:text-gray-300">
                                    All Classes
                                </Link>
                            </li>

                            {user && (
                                <>
                                    {
                                        isTeacher ||
                                        <li>
                                            <Link to="/teach-on" className="text-neutral-900 dark:text-neutral-300 hover:text-gray-300">
                                                Teach On Edugram
                                            </Link>
                                        </li>
                                    }                                   

                                    <li>
                                        <Link to="#" onClick={handleLogout} className="text-neutral-900 dark:text-neutral-300 hover:text-gray-300 lg:hidden ">
                                            Logout
                                        </Link>
                                    </li>
                                </>
                            )}

                            {!user && (
                                <li>
                                    <Link to="/login" className="text-neutral-900 dark:text-neutral-300 hover:text-gray-300">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>

                        <li className='flex sm:hidden lg:block items-center'>
                            <Switcher />
                        </li>

                        {user && (
                            <div className="relative group">
                                <img
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="w-10 h-10 object-cover rounded-full cursor-pointer border-2 border-white"
                                    src={user?.photoURL}
                                    alt="profile picture"
                                />
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 p-2 bg-gray-700 text-white rounded shadow-md">
                                        <p className="text-sm font-semibold">{user?.displayName}</p>
                                        <Link to="/dashboard" className="block py-2">
                                            Dashboard
                                        </Link>
                                        <button onClick={handleLogout} className="block py-2">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* <div>
                            <Switcher />
                        </div> */}

                    </div>
                </div>

                {/* Small Screens */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="dark:text-neutral-300 text-neutral-900 ">
                        <AlignRight />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-16 right-0 mt-2 p-2 bg-gray-700 text-white rounded shadow-md">
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="block py-2">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/classes" className="block py-2">
                                        All Classes
                                    </Link>
                                </li>

                                {user && (
                                    <>
                                        {
                                            isTeacher ||
                                            <li>
                                                <Link to="/teach-on" className="block py-2">
                                                    Teach On Edugram
                                                </Link>
                                            </li>
                                        }
                                        <li>
                                            <Link to="/dashboard" className="block py-2">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="block py-2">
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                )}

                                {!user && (
                                    <li>
                                        <Link to="/login" className="block py-2">
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
