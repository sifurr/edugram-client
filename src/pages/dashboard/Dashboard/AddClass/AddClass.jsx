import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddClass = () => {
   
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

  

    const onSubmit = async (data) => {

        // console.log("Image data file: ", data)

        const imageFile = { image: data.image[0] };
        // console.log("Image file: ", imageFile)

        const res = await axios.post(image_hosting_api, imageFile, {
            headers: { "content-type": "multipart/form-data" }
        })
        // console.log(res.data)

        if (res.data.success) {

            const classInfo = {
                title: data.title,
                name: user?.displayName,
                email: user?.email,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url
            }

            // console.log(classInfo)

            await axiosPublic.post('/api/v1/users/classes', classInfo, { withCredentials: true })
                .then(res => {
                    if (res.data.insertedId) {
                        // console.log("class has been created")
                        reset();
                        Swal.fire({
                            title: "Class has been added",
                            text: "",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000
                        });

                        // navigate("/dashboard/update-teacher-request")
                    }
                })
                .catch(err => {
                    // console.log(err);
                })
        }

    }

    return (
        <div>
            <Helmet>
                <title>Edugram | Add Class</title>
            </Helmet>

            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    Add Class
                </h2>
                <div className="mx-auto max-w-lg">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                    >


                        <div>
                            <label htmlFor="title" className="sr-only">Title</label>
                            <div className="mb-3">
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    className="w-full rounded-lg text-neutral-900 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Class Title"

                                />
                                {errors.title && <span className="text-xs text-red-500 ">Title is required</span>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <div className="mb-3">
                                <input
                                    {...register("name", { required: false })}
                                    type="text"
                                    className="w-full rounded-lg text-neutral-900 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Your name"
                                    disabled
                                    defaultValue={user?.displayName}

                                />
                                {errors.name && <span className="text-xs text-red-500 ">Name is required</span>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="mb-3">
                                <input
                                    {...register("email", { required: false })}
                                    type="text"
                                    className="w-full rounded-lg text-neutral-900 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Your Email"
                                    disabled
                                    defaultValue={user?.email}

                                />
                                {errors.email && <span className="text-xs text-red-500 ">Email is required</span>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="sr-only">Price</label>
                            <div className="mb-3">
                                <input
                                    {...register("price", { required: true })}
                                    type="number"
                                    className="w-full rounded-lg text-neutral-900 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Class price"


                                />
                                {errors.price && <span className="text-xs text-red-500 ">Price is required</span>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="sr-only">Description</label>
                            <div className="mb-3">
                                <textarea
                                    {...register("description", { required: true })}
                                    type="number"
                                    className="w-full rounded-lg text-neutral-900 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Class description"

                                />
                                {errors.description && <span className="text-xs text-red-500" >description is required</span>}
                            </div>
                        </div>

                        <div>


                            <label
                                htmlFor="formFile"
                                className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                            >
                                Upload Image

                            </label>

                            <input
                                {...register("image", { required: true })}
                                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                type="file"
                                id="formFile"
                                
                                />
                        </div>



                        <button
                            className="group relative inline-block overflow-hidden border px-8 py-3 focus:outline-none focus:ring border-indigo-600"
                        >
                            <span
                                className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600
                                     transition-all group-hover:w-full group-active:bg-indigo-500"
                            ></span>

                            <span
                                className="relative text-sm font-medium 
                                    text-indigo-600 transition-colors group-hover:text-white"
                            >
                                Add Class
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClass;