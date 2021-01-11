import React, { useState, useEffect } from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import Card from './card';
import './styles.css'

export default function PaymentForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    };
    setIsDisabled(true);

    let card = elements.getElement(CardElement);
    let result;

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });
    
    if (error) {
      console.log('error', error)
      // dispatch(handleShowModalAction(false));
      // dispatch(showMessageAction({variant: 'success', message: 'Payment successful'}));
    }
    console.log('success', paymentMethod)
  };

  useEffect(() => {
    if (stripe) setIsDisabled(false)
  }, [stripe])

  return (
    <form className='stripeCardContainer' onSubmit={handleSubmit}>
      <Card />
      <button color="primary">Confirm order</button>
    </form>
  );
}