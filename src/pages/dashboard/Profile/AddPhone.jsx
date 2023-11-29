import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const AddPhone = () => {
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
   
    

    const onSubmit = (data) => {

        const phoneNumber = {
            phone: data.phone
        }

        console.log(phoneNumber)
        const {email} = user;

        axiosPublic.patch(`/api/v1/users/add-phone/${email}`, phoneNumber, {withCredentials:true})
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    reset();
                    Swal.fire({
                        title: "Phone number has been added successfully!",
                        text: "",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000
                    });  

                    navigate("/dashboard/profile")              
                    
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <section className="dark:bg-[#000927] bg-gray-50">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <Helmet>
                    <title>Edugram | Add Phone Number</title>
                </Helmet>
                <h2 className='text-3xl text-center mt-20 mb-10 capitalize'>Add Phone Number</h2>

                <main
                    className="px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="flex items-center justify-center max-w-xl lg:max-w-3xl ">

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 gap-2">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="Phone"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                </label>
                                <input
                                    {...register("phone", { required: true })}
                                    type="tel"
                                    id="Phone"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    placeholder="Add your phone number"
                                />
                                {errors.phone && <span className="text-xs text-red-500 ">Phone number is required</span>}
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
                                        Add Phone
                                    </span>
                                </button>

                            </div>
                        </form>

                    </div>
                </main>
            </div>
        </section>
    );
};

export default AddPhone;