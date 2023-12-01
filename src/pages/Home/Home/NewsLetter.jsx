import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


function NewsLetter() {
    const axiosPublic = useAxiosPublic()
    const { register, formState: { errors }, reset, handleSubmit } = useForm(); 

    const onSubmit = (data) => {
        // console.log("button clicked")
        const userInfo = {
            phone: data.email
        }       

        axiosPublic.post(`/api/v1/newsLetters`, userInfo)
            .then(res => {
                if (res.data.insertedId) {
                     // console.log("emailed")

                    Swal.fire({
                        title: "Thank you! Your email is now included in our list!",
                        text: "",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });                              
                    reset();
                    
                }
            })
            .catch(err => {
                // console.log(err)
            })
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
            <div className="p-8 md:p-12 lg:px-16 lg:py-4">
                <div className="mx-auto max-w-lg text-center">
                    
                    <h2 className="font-bold text-xl lg:text-2xl p-4 text-center mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">                          
                            <span className="text-4xl lg:text-7xl font-black uppercase">Weekly Newsletter</span>
                        </h2> 

                    <p className="hidden text-gray-500 sm:mt-4 sm:block">
                        Subscribe to get exciting programming events offer. Besides, we have ongoing campaign on sale!
                    </p>
                </div>

                <div className="mx-auto mt-8 max-w-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="sm:flex sm:gap-4">
                        <div className="sm:flex-1">
                            <label htmlFor="email" className="sr-only">Email</label>

                            <input
                            {...register("email", { required: true, min:5 })}
                                type="email"
                                placeholder="Email address"                                
                                className="w-full rounded-md border-gray-200 dark:bg-gray-600 p-3 dark:text-neutral-300 text-neutral-900 shadow-sm transition focus:border-white placeholder:dark:text-white focus:outline-none focus:ring focus:ring-indigo-400"
                            />
                            {errors.email && <span className="text-xs text-red-500 ">Email is required</span>}
                        </div>


                        <button
                       
                            className="group relative inline-block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"

                        >
                            <span
                                className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                            ></span>
                            <span
                                className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                            >
                                Sign Up
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}


export default NewsLetter
