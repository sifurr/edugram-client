import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/edugram-logo.png'
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import Switcher from '../../../components/Switcher/Switcher';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const axiosPublic = useAxiosPublic()

    

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
        <nav className="relative  border-b-2 z-20 border-gray-300 dark:bg-[#000927] p-4 bg-gray-50 text-neutral-900 dark:text-neutral-300">
            <div className="container mx-auto flex justify-between">
                <div className="relative block p-4 lg:p-6">
                    <div className=' flex items-center gap-3'>
                        <img className='w-10 dark:bg-white rounded-full' src={logo} alt="Edugram Logo" />
                        <span className='text-2xl text-[#000927] font-bold'>Edugram</span>
                    </div>
                </div>

                <ul className="flex">
                    <li className="hidden md:block hover:bg-[#000927] hover:text-white">
                        <Link to="#" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Home</Link>
                    </li>
                    <li className="hidden md:block hover:bg-[#000927] hover:text-white">
                        <Link to="#" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">All Classes</Link>
                    </li>
                    
                    {
                        user &&
                        
                        <li className="hidden md:block hover:bg-[#000927] hover:text-white">
                            <Link to="/teach-on" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Teach On Edugram</Link>
                        </li>
                    }                    
                    <li className='flex items-center'>
                        <Switcher />
                    </li>

                    {
                        !user ?
                            <>
                               
                                <li className="hidden md:block hover:bg-[#000927] hover:text-white">
                                    <Link to="/login" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Login</Link>
                                </li>
                            </>
                            :
                           
                                <li className="hidden md:hidden lg:hidden hover:bg-[#000927] hover:text-white">
                                    <Link to="/login" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Login</Link>
                                </li>                            

                    }

                    {
                        !user ?
                            <li className="toggleable hover:bg-[#000927] hover:text-white">
                                <input type="checkbox" value="selected" id="toggle-one" className="toggle-input" />

                                <label htmlFor="toggle-one" className="block lg:hidden cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-bold">
                                    <p className='text-2xl'>X</p>
                                </label>

                                <div role="toggle" className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-[#000927]">
                                    <div className="container mx-auto w-full flex flex-wrap justify-end  ">
                                        <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                            <li>
                                                <Link to="/login" className="block lg:hidden p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Login</Link>
                                            </li>
                                            <hr className='lg:hidden block' />
                                            <li>
                                                <Link to="#" className="md:hidden block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="#" className="md:hidden block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">All Classes</Link>
                                            </li>


                                        </ul>

                                    </div>
                                </div>
                            </li>

                            :

                            <li className="toggleable hover:bg-[#000927] hover:text-white">
                                <input type="checkbox" value="selected" id="toggle-one" className="toggle-input" />

                                {
                                    user ?
                                        <label htmlFor="toggle-one" className="block cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-bold">
                                            <img className="w-10 h-10 object-cover rounded-full border-2 border-black p-1" src={user?.photoURL} alt="profile picture" />
                                        </label>
                                        :
                                        <label htmlFor="toggle-one" className="block cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-bold">
                                            <h1>x</h1>
                                        </label>

                                }
                                <div role="toggle" className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-[#000927]">
                                    <div className="container mx-auto w-full flex flex-wrap justify-end mx-2">
                                        <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">

                                            <li>
                                                <span to="#" className="block p-3 hover:bg-[#000927] text-gray-300 font-bold">
                                                    {user && user?.displayName}
                                                </span>
                                            </li>
                                            <li>
                                                <Link to="/dashboard" className="block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Dashboard</Link>
                                            </li>

                                            {
                                                user ?
                                                    <>
                                                        <li>
                                                            <Link to="/teach-on" className="block lg:hidden p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Teach On Edugram</Link>
                                                        </li>
                                                        <li>
                                                            <Link onClick={handleLogout} to="#" className="block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Logout</Link>
                                                        </li>
                                                    </>
                                                    :
                                                    <li>
                                                        <Link to="#" className="block lg:hidden p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Login</Link>
                                                    </li>
                                            }

                                            <hr className='lg:hidden block' />
                                            <li>
                                                <Link to="#" className="md:hidden block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="#" className="md:hidden block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">All Classes</Link>
                                            </li>


                                        </ul>

                                    </div>
                                </div>
                            </li>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
