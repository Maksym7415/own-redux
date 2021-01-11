import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

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
      setPaymentRequest(pr)
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        console.log(result)
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);
  console.log(paymentRequest)

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{paymentRequest}} />
  }

  // Use a traditional checkout form.
  return 'Insert your form or button component here.';
}

export default CheckoutForm