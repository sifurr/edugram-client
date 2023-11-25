/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../assets/edugram-logo.png';
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import bg from '../../assets/login-bg.svg';



const Login = () => {
    const { signIn, googleSingIn } = useAuth();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const from = location?.state?.from?.pathname || '/';


    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(res => {
                const email = data.email;
                const user = { email };
                // console.log("user form login--->", user)
                axiosPublic.post("/api/v1/auth/access-token", user, { withCredentials: true })
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.success) {
                            Swal.fire({
                                title: "Logged in successfully!",
                                text: "",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1000
                            });
                            // console.log("user: ", res.user);
                            navigate(from, { replace: true })
                        }
                    })
            })
            .catch(err => {
                // console.log(err.message)
            })
    }

    const handleGoogleLogin = () => {
        googleSingIn()
            .then(res => {
                // console.log(res.user)
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    role: 'student',
                    phone: "",
                    teacherRequest: false,
                    
                }
                const email = res.user.email;  
                const user = {email};             

                axiosPublic.post("/api/v1/auth/access-token", user, { withCredentials: true })
                    .then(res => {
                        // console.log("token res,", res.data)
                        if (res.data.success) {

                            axiosPublic.post("/api/v1/users", userInfo)
                            .then(result => {
                                if(result.data.insertedId)
                                {
                                    Swal.fire({
                                        title: "Logged in successfully!",
                                        text: "",
                                        icon: "success",
                                        showConfirmButton: false,
                                        timer: 1000
                                    });
                                    // console.log("user: ", res.user);
                                    navigate(from, { replace: true })
                                }
                            })
                            // .catch(err => console.log(err))

                            
                        }
                    })
            })
            .catch(err => {
                // console.log(err)
            })
    }

    return (

        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section
                    className="relative flex h-32 items-end bg-[#000927] lg:col-span-5 lg:h-full xl:col-span-6"
                >
                    <img
                        alt="bg"
                        src={bg}
                        className="absolute lg:inset-0 lg:h-2/3 lg:w-full object-cover opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <Link className="block text-white" to="/">
                            <span className="sr-only">Home</span>
                            <img src={logo} className="border-2 rounded-full w-12 bg-white h-12" alt="" />
                        </Link>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Login to Edugram
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Education for all
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <Link
                                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#000927] sm:h-20 sm:w-20"
                                to="/"
                            >
                                <span className="sr-only">Home</span>
                                <img src={logo} alt="" />
                            </Link>

                            <h1
                                className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                            >
                                Welcome to Edugram
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Education for all.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">


                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="Email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>

                                <input
                                    {...register("email", { required: true })}

                                    type="email"
                                    id="Email"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.email && <span className="text-red-600 text-xs">Email is required</span>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="Password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>

                                <input
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })
                                    }
                                    type="text"
                                    id="Password"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600 text-xs"> Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600 text-xs"> At least 6 characters is needed</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600 text-xs"> Less than 21 characters is needed</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600 text-xs">Password must have one uppercase, one lowercase, one number, and one special character</p>
                                )}
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-[#000927] bg-[#000927] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#000927] focus:outline-none focus:ring active:text-[#000927]"
                                >
                                    Login
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Do not have an account?
                                    <Link to="/signup" className="text-gray-700 underline"> Signup</Link>
                                </p>
                            </div>
                        </form>
                        <div className="col-span-6 mt-6 sm:flex sm:items-center sm:gap-4">
                            <button
                                onClick={handleGoogleLogin}
                                className="inline-block shrink-0 rounded-md border border-[#000927] bg-[#000927] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#000927] focus:outline-none focus:ring active:text-[#000927]"
                            >
                                Login with Google
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default Login;