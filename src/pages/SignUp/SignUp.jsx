import { Link, useNavigate } from "react-router-dom";
import bg from "../../assets/signup-bg.png";
import logo from '../../assets/edugram-logo.png';
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SignUp = () => {
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const { createUser, googleSingIn, setLoading, updateNewUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        // console.log(data);

        createUser(data.email, data.password)
            .then(res => {
                const newUser = res.user;

                setLoading(true)
                updateNewUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/api/v1/users', userInfo)
                            .then(res => {
                                // console.log("user added to the database");
                                if (res.data.insertedId) {
                                    // console.log("user profile updated")
                                    reset();
                                    Swal.fire({
                                        title: "Signed up successfully!",
                                        text: "",
                                        icon: "success",                                        
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    setLoading(false);
                                    navigate('/');
                                }
                            })
                    })
                    .catch(err => {
                        // console.log(err);
                    })

                // console.log("logged in User: ", newUser);

            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const handleGoogleLogin = () => {
        googleSingIn()
            .then(res => {
                const email = res.user.email;
                // console.log("from google sign-in",email)
                const user = { email };

                axiosPublic.post(`/api/v1/auth/access-token`, user, { withCredentials: true })
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.success) {
                            toast.success("Logged in successfully")
                            navigate(location?.state ? location.state : '/')
                        }
                    })
            })
            .catch(err => {
                console.log(err.message)
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
                            Welcome to Edugram
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
                                    htmlFor="FirstName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>

                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    id="FirstName"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.name && <span className="text-xs text-red-500 ">Name is required</span>}
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="PhotoUrl" className="block text-sm font-medium text-gray-700">
                                    PhotoUrl
                                </label>

                                <input
                                    {...register("photoURL", { required: true })}

                                    type="url"
                                    id="PhotoUrl"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.photoURL && <span className="text-red-600 text-xs">Photo URL is required</span>}
                            </div>

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
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <Link to="/login" className="text-gray-700 underline"> Log in</Link>
                                </p>
                            </div>
                        </form>
                        <div className="col-span-6 mt-6 sm:flex sm:items-center sm:gap-4">
                            <button
                                onClick={handleGoogleLogin}
                                className="inline-block shrink-0 rounded-md border border-[#000927] bg-[#000927] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#000927] focus:outline-none focus:ring active:text-[#000927]"
                            >
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default SignUp;