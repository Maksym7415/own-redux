import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './paymentForm';
import GooglePay from './paymentReqButton';

const stripePromise = loadStripe('pk_test_51HGjVfCcIG0MPJSGSyEcBP3PyICKdRKpXMC1TP4r08nXQ6diqfdIN4Uw3O5c1vdgEqc7deyecbDYde46HdRMdVtt00trU2DOSP');

function Stripe() {

  return (
    <Elements stripe={stripePromise}>
      <GooglePay />
      <CheckoutForm />
    </Elements>  
  );
}

export default Stripe;