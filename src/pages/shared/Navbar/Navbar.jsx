import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/edugram-logo.png'


const Navbar = () => {

    return (
        <nav className="relative bg-white border-b-2 border-gray-300 text-gray-900">
            <div className="container mx-auto flex justify-between">
                <div className="relative block p-4 lg:p-6">
                    <div className=' flex items-center gap-3'>
                        <img className='w-10' src={logo} alt="Edugram Logo" />
                        <span className='text-2xl text-[#000927] font-bold'>Educgram</span>
                    </div>
                </div>

                <ul className="flex">
                    <li className="hidden md:block hover:bg-[#000927] hover:text-white">
                        <Link to="#" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Home</Link>
                    </li>
                    <li className="hidden md:block hover:bg-[#000927] hover:text-white">
                        <Link to="#" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">All Classes</Link>
                    </li>
                    <li className="hidden md:block hover:bg-[#000927] hover:text-white">
                        <Link to="#" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Teach On</Link>
                    </li>
                    <li className="hidden md:block hover:bg-[#000927] hover:text-white">
                        <Link to="#" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Signin</Link>
                    </li>


                    <li className="toggleable hover:bg-[#000927] hover:text-white">
                        <input type="checkbox" value="selected" id="toggle-one" className="toggle-input" />
                        <label htmlFor="toggle-one" className="block cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-bold">
                            <img className="w-10 h-10 object-cover rounded-full border-2 border-black p-1" src="https://i.ibb.co/Z6zyYzq/pexels-pixabay-220453.jpg" alt="" />
                        </label>
                        <div role="toggle" className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-[#000927]">
                            <div className="container mx-auto w-full flex flex-wrap justify-end mx-2">
                                <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                    <li>
                                        <Link to="#" className="block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">John Doe</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Logout</Link>
                                    </li>

                                    {/*  */}

                                    <hr className='lg:hidden block' />
                                    <li>
                                        <Link to="#" className="md:hidden block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="md:hidden block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">All Classes</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="md:hidden block p-3 hover:bg-[#000927] text-gray-300 hover:text-white">Teach ON</Link>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </li>


                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
