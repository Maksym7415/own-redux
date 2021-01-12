import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';

const GooglePay = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [clientSecret, setClientSecret] = useState(null)

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1099,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      console.log('get pr', pr)
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        console.log('paymentReq check availeable', result)
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  useEffect(() => {
    const url = 'http://localhost:8000/create-session'
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
      .then((res) => res.json)
      .then((res) => setClientSecret(res.clientSecret))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (paymentRequest) {
      paymentRequest.on('paymentmethod', async (ev) => {
        // Confirm the PaymentIntent without handling potential next actions (yet).
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
          clientSecret,
          {payment_method: ev.paymentMethod.id},
          {handleActions: false}
        );
      
        if (confirmError) {
          // Report to the browser that the payment failed, prompting it to
          // re-show the payment interface, or show an error message and close
          // the payment interface.
          ev.complete('fail');
        } else {
          // Report to the browser that the confirmation was successful, prompting
          // it to close the browser payment method collection interface.
          ev.complete('success');
          // Check if the PaymentIntent requires any actions and if so let Stripe.js
          // handle the flow. If using an API version older than "2019-02-11" instead
          // instead check for: `paymentIntent.status === "requires_source_action"`.
          if (paymentIntent.status === "requires_action") {
            // Let Stripe.js handle the rest of the payment flow.
            const {error} = await stripe.confirmCardPayment(clientSecret);
            if (error) {
              // The payment failed -- ask your customer for a new payment method.
            } else {
              // The payment has succeeded.
            }
          } else {
            // The payment has succeeded.
          }
        }
      });
    }
  }, [paymentRequest]) 

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{paymentRequest}} />
  }

  // Use a traditional checkout form.
  return 'Google pay is not working';
}

export default GooglePay