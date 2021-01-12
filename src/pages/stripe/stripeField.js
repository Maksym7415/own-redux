import React from 'react';

export default function StripeField({ placeholder, label, value, onChange }) {
    
    return (
        <div>
            <label style={{color: 'rgba(26,26,26,.7)', fontWeight: 500, fontSize: '13px'}}>
                {label}
            </label>
            <div className='StripeElement'>
                <input style={{width: '100%', border: 0, outline: 'none'}} placeholder={placeholder} value={value} onChange={onChange}/>
            </div>
        </div>

    )
}