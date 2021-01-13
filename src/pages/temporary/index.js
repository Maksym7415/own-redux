import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HGjVfCcIG0MPJSGSyEcBP3PyICKdRKpXMC1TP4r08nXQ6diqfdIN4Uw3O5c1vdgEqc7deyecbDYde46HdRMdVtt00trU2DOSP');

function Stripe() {

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const url = 'http://localhost:8000/create-session'
    const body = JSON.stringify({
      name: 'Jon Dow',
      currency: 'usd',
      quantity: 1,
      amount: 200,
      images: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
    })
    const response = await fetch(url, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });


    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <>
      <button role="link" onClick={handleClick}>
        Checkout
      </button>
    </>
  );
}

export default Stripe;