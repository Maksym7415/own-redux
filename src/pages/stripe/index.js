import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm';
import GooglePay from './paymentReqButton';
import './styles.css'

const stripePromise = loadStripe('pk_test_51HGjVfCcIG0MPJSGSyEcBP3PyICKdRKpXMC1TP4r08nXQ6diqfdIN4Uw3O5c1vdgEqc7deyecbDYde46HdRMdVtt00trU2DOSP');

function Stripe() {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const url = 'https://eat-beat.hopto.org/sandbox/client-secret'
    const body = JSON.stringify({
      currency: 'usd',
      amount: 200,
    })
    fetch(url, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then((res) => res.json())
      .then((res) => setClientSecret(res.clientSecret))
      .catch((err) => console.log(err));
  }, []);
  console.log(clientSecret)

  return (
    <Elements stripe={stripePromise}>
      {
        clientSecret 
          ? <div className='mainContainer'>
              <GooglePay clientSecret={clientSecret} />              
              <CheckoutForm clientSecret={clientSecret} />
            </div>
          : <div>Your action by loading payment intent</div>
      }
    </Elements>  
  );
}

export default Stripe;