import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import local from './local';

const GooglePay = ({ clientSecret }) => {
  const [lang] = useState('en')
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [isShowButton, setIsShowButton] = useState(false);

  const handleClick = (paymentRequest) => paymentRequest.show();

  const options = {
    style: {
      paymentRequestButton: {
        type: 'default',
        // One of 'default', 'book', 'buy', or 'donate'
        // Defaults to 'default'
  
        theme: 'dark',
        // One of 'dark', 'light', or 'light-outline'
        // Defaults to 'dark'
  
        // height: '64px',
        // Defaults to '40px'. The width is always '100%'.
      },
    }
  }

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
            // button.className = 'btn btn-dark';
            // button.style.backgroundColor = '#000';
            // button.querySelector('.default').style.display = 'none';
            // button.querySelector('.applepay').style.display = 'inline';
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

  if (paymentRequest) {
    return (
      <div className='apple-pay-button-container'>
        <button onClick={() => handleClick(paymentRequest)} type="button" className={isShowButton ? 'inline-block' : 'disp-none'}>
          <span className="default">
              <i className="fas fa-lg fa-credit-card"></i>
              Pay Now
          </span>
          <span className="applepay ml-4 mr-4" style={{display: 'none'}}>
              <span className="fa-lg">
                  <i className="fab fa-apple-pay" data-fa-transform="grow-12"></i>
              </span>
              <span className="sr-only">Purchase with Apple Pay</span>
          </span>
      </button>
      {/* <PaymentRequestButtonElement options={{...options, paymentRequest}} /> */}
      <div className='content-divider'>
        <div className='flex-setting divider-line'></div>
        <div className='flex-setting'>{local[lang].dividerText}</div>
        <div className='flex-setting divider-line'></div>
      </div>
      </div>
    )  
  }

  // Use a traditional checkout form.
  return 'Google pay is not working';
}

export default GooglePay;