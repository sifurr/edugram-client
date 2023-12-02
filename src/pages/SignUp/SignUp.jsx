import { Link, useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/signup-bg.png";
import logo from '../../assets/edugram-logo.png';
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";



const SignUp = () => {
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const { createUser, googleSingIn, logOut, setLoading, updateNewUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        // console.log(data);

        createUser(data.email, data.password)
            .then(res => {
                setLoading(true)
                updateNewUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: 'student',
                            phone: data.phone,
                            photo: data.photoURL,
                            teacherRequest: false
                        }
                        axiosPublic.post('/api/v1/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        title: "Signed up successfully!",
                                        text: "",
                                        icon: "success",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    setLoading(false);
                                    logOut()
                                        .then(() => {
                                            // console.log("");
                                            navigate(from, { replace: true })
                                        })
                                        .catch(err => {
                                            // console.log("e1",err)
                                        })
                                }
                            })
                    })
                    .catch(err => {

                        // console.log("e2",err);
                    })
            })
            .catch(err => {
                // console.log("e3",err);
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
                    phone:  "",
                    teacherRequest: false
                }
                const email = res.user.email;
                const user = { email };

                axiosPublic.post("/api/v1/auth/access-token", user, { withCredentials: true })
                    .then(res => {
                        // console.log("token res,", res.data)
                        if (res.data.success) {
                            axiosPublic.post("/api/v1/users", userInfo)
                                .then(result => {
                                    if (result.data.insertedId) {
                                        Swal.fire({
                                            title: "Login successful!",
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

        <section className=" bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
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
                                    className="block text-sm font-medium text-neutral-900 dark:text-neutral-300"
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
                                <label htmlFor="PhotoUrl" className="block text-sm font-medium text-neutral-900 dark:text-neutral-300">
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
                                    className="block text-sm font-medium text-neutral-900 dark:text-neutral-300"
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
                                    htmlFor="Phone"
                                    className="block text-sm font-medium text-neutral-900 dark:text-neutral-300"
                                >
                                    Phone
                                </label>

                                <input
                                    {...register("phone", { required: false })}

                                    type="text"
                                    id="Phone"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="Password"
                                    className="block text-sm font-medium text-neutral-900 dark:text-neutral-300"
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
                                    type="password"
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
                                    className="group relative inline-block overflow-hidden border border-indigo-500 px-4 py-2 focus:outline-none focus:ring"
                                >
                                    <span
                                        className="absolute inset-y-0 left-0 w-[2px] bg-indigo-500 transition-all group-hover:w-full group-active:bg-indigo-500"
                                    ></span>
                                    <span
                                        className="relative text-sm font-medium text-indigo-500 transition-colors group-hover:text-white"
                                    >
                                        Create an account
                                    </span>
                                </button>

                                <p className="mt-4 text-sm  text-neutral-900 dark:text-neutral-300">
                                    Already have an account?
                                    <Link to="/login" className=" text-neutral-900 dark:text-neutral-300 underline"> Log in</Link>
                                </p>
                            </div>
                        </form>
                        <div className="col-span-6 mt-6 sm:flex sm:items-center sm:gap-4">                            

                            <button
                            onClick={handleGoogleLogin}
                                    className="group relative inline-block overflow-hidden border border-indigo-500 px-4 py-2 focus:outline-none focus:ring"
                                >
                                    <span
                                        className="absolute inset-y-0 left-0 w-[2px] bg-indigo-500 transition-all group-hover:w-full group-active:bg-indigo-500"
                                    ></span>
                                    <span
                                        className="relative text-sm font-medium text-indigo-500 transition-colors group-hover:text-white"
                                    >
                                        Login with Google
                                    </span>
                                </button>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default SignUp;