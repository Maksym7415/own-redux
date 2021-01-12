import React, { useState } from 'react';
import {CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe} from '@stripe/react-stripe-js';
import StripeField from './stripeField';
import CvcPicture from '../../components/cvcPicture';
import StripeSelect from './stripeSelect';
import countriesList from '../../data/countriesList'

function Card({ clientSecret }) {
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    name: '',
    address: {
      country: ''
    }
  });
  const [cardComplete, setCardComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('here')
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    let card = elements.getElement(CardNumberElement);
    let result;

    if (card) {
      result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: billingDetails
        }
      });
    }
    
    if (result) {
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log('error', result.error)
      };
      console.log('success')
    }
  };

  return (
    <div>
    <div style={{width: '380px', margin: '0 auto', padding: '10% 40%'}}>
           <form onSubmit={handleSubmit}>
            <div>
                <div className='p-8'>
                    <StripeField
                      placeholder=""
                      label='Эл. почта'
                      value={billingDetails.email}
                      onChange={(event) => setBillingDetails({...billingDetails, email: event.target.value})}
                    />
                </div>
              <div className='p-8'>
                <label style={{color: 'rgba(26,26,26,.7)', fontWeight: 500, fontSize: '13px'}}>
                  Данные карты
                </label>
                <div  style={{position: 'relative'}}>
                  <div style={{display: 'flex', position: 'absolute', right: '-15px', bottom: '10px', justifyContent: 'space-evenly', width: '90px'}}>
                    <img src='https://js.stripe.com/v3/fingerprinted/img/visa-365725566f9578a9589553aa9296d178.svg' alt='visa'/>
                    <img src='https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg' alt='visa'/>
                    <img src='https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg' alt='visa'/>
                  </div>
                      <CardNumberElement
                       onChange={(e) => {
                          setCardComplete(e.complete);
                      }}
                      />
                  </div>
                  <div style={{display: 'flex', position: 'relative'}}>
                    <div style={{width: '50%'}}>
                      <CardExpiryElement
                        onChange={(e) => {
                          setCardComplete(e.complete);
                        }}
                      /> 
                    </div>
                    <div style={{width: '50%'}}>
                      <div style={{display: 'flex', position: 'absolute', right: '-17px', bottom: '5px'}}>
                        <CvcPicture/>
                      </div>
                      <CardCvcElement
                        onChange={(e) => {
                          setCardComplete(e.complete);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='p-8'>
                  <StripeField
                    placeholder=""
                    label='Имя и фамилия, указанные на карте'
                    value={billingDetails.name}
                    onChange={(event) => setBillingDetails({...billingDetails, name: event.target.value})}
                  />
                </div>
                <div className='p-8'>
                  <StripeSelect 
                    data={countriesList}
                    label={'Страна или регион'}
                    value={billingDetails.address.country}
                    onChange={(country) => setBillingDetails({...billingDetails, address: {...billingDetails.address, country}})}
                  />
                </div>
                <div className='p-8'>
                  <button className='SubmitButton SubmitButton--incomplete'  type="submit">Pay</button>
                </div>
             
            </div>
      </form>
      
    </div>
    </div>
  );
};

export default Card;