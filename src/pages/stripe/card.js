import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import './styles.css'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function Card() {
  return (
    <div style={{width: '100%'}}>
      <h5>Card details</h5>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
};

export default Card;