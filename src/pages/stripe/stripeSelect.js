import React, { useState, useRef, useEffect } from 'react';
import BotArrow from '../../components/bottomArrow';

import './styles.css';

export default function StripeSelect({ data, label, value, onChange }) {

    const ref = useRef(null)
    const [show, setShow] = useState(false);
    const [country, setCountry] = useState({});

    const blurHandler = (event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        setShow(false)
    }

    const open = () => {
        setShow(true);
    }

    const getCountry = (code) => {
        setShow(false);
        const currentCountry = data.find((el) => el.code === code)
        setCountry({
            name: currentCountry.name,
            code: currentCountry.code
        })
        onChange(currentCountry.code)
    }

    useEffect(() => {
        ref?.current?.focus();
    }, [show])

    return (
        <div style={{position: 'relative'}}>
            <label style={{color: 'rgba(26,26,26,.7)', fontWeight: 500, fontSize: '13px'}}>
                {label}
            </label>
            <div className='StripeElement' >
                <div style={{padding: '3px'}}>
                    <div onClick={open} style={{display: 'flex', justifyContent: data.find((el) => el.code === value)?.name ? 'space-between' : 'flex-end'}}>
                    <span style={{fontSize: '13px'}}>{data.find((el) => el.code === value)?.name}</span>
                        <BotArrow/>
                    </div>
                </div>
                {show && <div onBlur={blurHandler} style={{width: '100%', maxHeight: '400px', overflow: 'auto', position: 'absolute', zIndex: 100, backgroundColor: '#fff', bottom: '40px', outline: 'none', border: '0.5px solid #80808099'}} tabIndex={1} ref={ref}>
                    <div  style={{padding: '0px 0px 0px 12px'}}>
                        {data.map(({ code, name }) => <p key={code} className='country' onClick={() => getCountry(code)}>{name}</p>)}
                    </div>
                </div>}
            </div>
        </div>
    )
}