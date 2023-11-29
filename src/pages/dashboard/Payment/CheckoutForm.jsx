import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCart from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import moment from "moment";



const CheckoutForm = () => {

    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    console.log("total price: ", totalPrice)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosPublic.post('/api/v1/create-payment-intent', { price: totalPrice }, { withCredentials: true })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosPublic, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
            console.log("error", error);
        }
        else {
            setError('');
            console.log("payment method", paymentMethod)
        }

        // confirm payment
        const { paymentIntent, error: confirmationError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous'
                    }
                }
            }
        )

        if (confirmationError) {
            console.log("Confirmation error", confirmationError);
        } else {
            console.log("Payment intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                const trxId = paymentIntent.id;
                setTransactionId(trxId);               

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    paymentTime: moment().format("h:mm:ss a, D-M-YYYY"),                    
                    cartIds: cart.map(item => item._id),
                    classId: cart.map(item => item.classId),
                    deliveryStatus: 'pending'
                }

                const res = await axiosPublic.post("/api/v1/payments", payment, { withCredentials: true });
                console.log(res.data)
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the payment!",
                        showConfirmButton: false,
                        timer: 3000
                    });
                }

                navigate("/dashboard/profile");
            }
        }
    }

    return (
        <div>
            <h2 className='text-3xl text-center'>Pay with your card</h2>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />                

                <button
                    className={`group relative mt-10 inline-block overflow-hidden border px-8 py-3 focus:outline-none focus:ring ${!stripe || !clientSecret ? 'border-gray-400 cursor-not-allowed' : 'border-indigo-600'
                        }`}
                    
                        disabled={!stripe || !clientSecret}
                >
                    <span
                        className={`absolute inset-y-0 left-0 w-[2px] ${!stripe || !clientSecret ? 'bg-gray-400' : 'bg-indigo-600'
                            } transition-all group-hover:w-full group-active:bg-indigo-500`}
                    ></span>

                    <span
                        className={`relative text-sm font-medium ${!stripe || !clientSecret
                            ? 'text-gray-400'
                            : 'text-indigo-600 transition-colors group-hover:text-white'
                            }`}
                    >
                        Pay
                    </span>
                </button>

            </form>
            <p className="text-red-500 mt-5">{error}</p>
            {
                transactionId && <p className="text-green-500"> Your transaction ID: {transactionId} </p>
            }
        </div>
    );
};

export default CheckoutForm;