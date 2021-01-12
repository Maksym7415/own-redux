import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import local from './local';
import googleIcon from './images/google.png';
import appleIcon from './images/apple.jpg';

const GooglePay = ({ clientSecret }) => {
  const [lang] = useState('en')
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [isShowButton, setIsShowButton] = useState(true);
  const [isAppleButton, setIsAppleButton] = useState(true)

  const handleClick = (paymentRequest) => paymentRequest.show();

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
          setIsShowButton(true)
          setPaymentRequest(pr);

          if (result.applePay) {
            setIsAppleButton(true);
        }
        }
      });
    }
  }, [stripe]);

  useEffect(() => {
    if (paymentRequest) {
      console.log('paymentrequest')
      paymentRequest.on('paymentmethod', async (ev) => {
        // Confirm the PaymentIntent without handling potential next actions (yet).
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
          clientSecret,
          {payment_method: ev.paymentMethod.id},
          {handleActions: false}
        );
      console.log('pr on event', paymentIntent, confirmError)
        if (confirmError) {
          // Report to the browser that the payment failed, prompting it to
          // re-show the payment interface, or show an error message and close
          // the payment interface.
          ev.complete('fail');
          console.log('error')
        } else {
          // Report to the browser that the confirmation was successful, prompting
          // it to close the browser payment method collection interface.
          ev.complete('success');
          console.log('success')
          // Check if the PaymentIntent requires any actions and if so let Stripe.js
          // handle the flow. If using an API version older than "2019-02-11" instead
          // instead check for: `paymentIntent.status === "requires_source_action"`.
          if (paymentIntent.status === "requires_action") {
            // Let Stripe.js handle the rest of the payment flow.
            const {error} = await stripe.confirmCardPayment(clientSecret);
            if (error) {
              // The payment failed -- ask your customer for a new payment method.
              console.log('error')
            } else {
              // The payment has succeeded.
              console.log('success')
            }
          } else {
            // The payment has succeeded.
            console.log('success')
          }
        }
      });
    }
  }, [paymentRequest]) 

  // if (paymentRequest) {
    return (
      <div className='apple-pay-button-container'>
        {
          isAppleButton
            ? (
                <button onClick={() => handleClick(paymentRequest)} className={isShowButton ? 'google-button inline-block' : 'disp-none'}>
                  <span className="default">
                      <img alt='google-icon' className='google-apple-button-icon' src={appleIcon}></img>
                  </span>
                  <span>Pay</span>
                </button>
              )
            : (
              <button onClick={() => handleClick(paymentRequest)} className={isShowButton ? 'google-button inline-block' : 'disp-none'}>
                <span className="default">
                    <img alt='apple-icon' className='google-apple-button-icon' src={googleIcon}></img>
                </span>
                <span>Pay</span>
              </button>
            )  
        }
      <div className='content-divider'>
        <div className='flex-setting divider-line'></div>
        <div className='flex-setting'>{local[lang].dividerText}</div>
        <div className='flex-setting divider-line'></div>
      </div>
      </div>
    )  
  // }

  // Use a traditional checkout form.
  return 'Google pay is not working';
}

export default GooglePay;