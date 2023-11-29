import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCart from "../../../hooks/useCart";
import Payment from "../Payment/Payment";
import toast from "react-hot-toast";


const Cart = () => {
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const axiosPublic = useAxiosPublic()
    console.log(cart)

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/api/v1/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.success("Item has been removed")
                        }
                    })

            }
        });

    }

    return (
        <div className="dark:bg-[#000927] bg-gray-50 text-neutral-900 dark:text-neutral-300">
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <header className="text-center">
                            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-300 sm:text-3xl">Your Cart</h1>
                        </header>

                        <div className="mt-8">
                            <ul className="space-y-4">
                                {
                                    cart?.map(cartItem =>

                                        <li key={cartItem._id} className="flex items-center gap-4">
                                            <img
                                                src={cartItem?.image} alt={cartItem?.title}
                                                className="h-16 w-16 rounded object-cover"
                                            />

                                            <div>
                                                <h3 className="text-sm text-neutral-900 dark:text-neutral-300 capitalize">{cartItem?.title}</h3>                                               
                                            </div>

                                            <div className="flex flex-1 items-center justify-end gap-2">
                                                <form>
                                                    <label htmlFor="Line1Qty" className="sr-only"> Price </label>

                                                    <input
                                                        type="text"          
                                                        value={`$${cartItem?.price}`}
                                                        id="Line1Qty"
                                                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-neutral-900 dark:text-neutral-900 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none
                                                placeholder:text-neutral-900
                                                "
                                                    />
                                                </form>

                                                <button onClick={()=>handleDelete(cartItem._id)} className="text-gray-600 transition hover:text-red-600">
                                                    <span className="sr-only">Remove item</span>

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-4 w-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    )
                                }


                            </ul>

                            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                <div className="w-screen max-w-lg space-y-4">

                                    <dl className="space-y-0.5 text-sm text-gray-700">

                                        <div className="flex text-neutral-900 dark:text-neutral-300 justify-between !text-base font-medium">
                                            <dt>Total</dt>
                                            <dd>${totalPrice}</dd>
                                        </div>
                                    </dl>

                                    

                                    <div>
                                        <Payment />
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cart;