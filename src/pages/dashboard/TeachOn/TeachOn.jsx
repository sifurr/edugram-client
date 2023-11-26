import { Helmet } from "react-helmet-async";                 
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import moment from 'moment';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const TeachOn = () => {
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();

    // console.log(user.photoURL)

    const onSubmit = async (data) => {
        const name = data.name;
        const email = user?.email;
        const photo = data.photo;
        const experience = data.experience;
        const title = data.title;
        const category = data.category;
        const requestMade = true;        
        const requestedTime = moment().format("h:mm:ss a, D-M-YYYY");
        const teacherRequestInfo = {name, email, photo, experience, title, category,requestMade, requestedTime}

        axiosPublic.post('/api/v1/users/teacher-requests', teacherRequestInfo, {withCredentials:true})
            .then(res => {
                if (res.data.insertedId) {
                    reset();
                    Swal.fire({
                        title: "Thanks for your request",
                        text: "",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000
                    });                    
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    // console.log("is admin--->", isAdmin);
    return (
        <div className="dark:bg-[#000927] bg-gray-50 text-neutral-900 dark:text-neutral-300">
            <Helmet>
                <title>Edugram | Teach On</title>
            </Helmet>
            <h2 className='text-3xl text-center'>Teach On Edugram</h2>
            <div>
                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                            <div className="lg:col-span-2 lg:py-12">
                                <p className="max-w-xl text-lg">
                                    Welcome to Edugram! We appreciate your endeavour to share your knowledge with world.
                                </p>

                                <div className="mt-8">
                                    <Link to="#" className="text-2xl font-bold text-pink-600">
                                        000-000-000
                                    </Link>

                                    <address className="mt-2 not-italic">
                                        220B Baker Street, London, England.
                                    </address>
                                </div>
                            </div>

                            <div className="rounded-lg dark:bg-[#000927] bg-gray-50 dark:border-2 dark:border-white p-8 shadow-xl lg:col-span-3 lg:p-12 text-neutral-900 dark:text-neutral-300">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                                    <div>
                                        <label className="" htmlFor="">Name</label>
                                        <input
                                            {...register("name", { required: true })}
                                            className="w-full rounded-lg border-gray-200 text-neutral-900 p-3 text-sm"
                                            placeholder="Name"
                                            defaultValue={user?.displayName}
                                            type="text"
                                            id="name"
                                        />
                                        {errors.name && <span className="text-xs text-red-500 ">Name is required</span>}
                                    </div>
                                    <div>
                                        <label className="" htmlFor="">Photo</label>
                                        <input
                                            {...register("photo", { required: true })}
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm text-neutral-900"
                                            placeholder="Profile Picture"
                                            type="text"
                                            id="photo"
                                            defaultValue={user?.photoURL}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1">

                                        <label className="" htmlFor="">Experience</label>

                                    </div>

                                    <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                        <div>
                                            <input
                                                {...register("experience", { required: true })}
                                                value={"beginner"}
                                                className="peer sr-only"
                                                id="option1"
                                                type="radio"
                                                tabindex="-1"

                                            />

                                            <label
                                                htmlFor="option1"
                                                className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                                tabindex="0"
                                            >
                                                <span className="text-sm"> Beginner </span>
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                {...register("experience", { required: true })}
                                                value={"experienced"}
                                                className="peer sr-only"
                                                id="option2"
                                                type="radio"
                                                tabindex="-1"

                                            />

                                            <label
                                                htmlFor="option2"
                                                className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                                tabindex="0"
                                            >
                                                <span className="text-sm"> Experienced </span>
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                {...register("experience", { required: true })}
                                                value={"some idea"}
                                                className="peer sr-only"
                                                id="option3"
                                                type="radio"
                                                tabindex="-1"

                                            />

                                            <label
                                                htmlFor="option3"
                                                className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                                tabindex="0"
                                            >
                                                <span className="text-sm"> Some Idea </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <div>
                                            <label className="" htmlFor="title">Title</label>
                                            <input
                                                {...register("title", { required: true })}
                                                className="w-full rounded-lg border-gray-200 p-3 text-sm text-neutral-900"
                                                placeholder="Title"
                                                type="text"
                                                id="title"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="block text-sm font-medium text-gray-900">
                                            Category
                                        </label>
                                        <select

                                            id="Category"
                                            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                                            {...register("category", { required: true })}
                                            defaultValue="default"
                                        >

                                            <option disabled value="default">Please select</option>
                                            <option value="web development">Web Development</option>
                                            <option value="digital marketing">Digital Marketing</option>
                                            <option value="programming">Programming</option>
                                            <option value="block chain">Block Chain</option>
                                            <option value="artificial intelligence">Artificial Intelligence</option>
                                            <option value="emotional intelligence">Emotional Intelligence</option>

                                        </select>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="inline-block w-full rounded-lg bg-black dark:bg-white px-5 py-3 font-medium text-white dark:text-black  sm:w-auto"
                                        >
                                            Submit for Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    );
};

export default TeachOn;