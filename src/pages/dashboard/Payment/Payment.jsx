import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import Cart from '../Cart/Cart';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div>            
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>                
            </div>           
        </div>
    );
};

export default Payment;