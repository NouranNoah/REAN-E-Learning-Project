

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Checkout';
import Cookies from "universal-cookie";
import './PaymentForm.css'; 
import Navbar from '../../components/Navbar';

const stripePromise = loadStripe("pk_test_51QBuHvK5Jdes3wlnRMcJEYF2fKcokByW9YJ4AyzFc28XV0lifwNZTDpF86UIc3oyAo94GXuRRmUDXQriIP3yPAPY008etbmHXO");

const PaymentPage = () => {
  const cookie = new Cookies();
  const gettoken = cookie.get("Bearer");
  const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/purchases/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${gettoken}`,
            },
            body: JSON.stringify({ amount: 1000 }),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
        },
    };

  return (
      <>
          <div className='inside-payment'>
          <Navbar/>
          </div>
     
      <div className="payment-page">
        <div className='formmm'>

        
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
        </div>
    </>
    
      
    );
};

export default PaymentPage;





