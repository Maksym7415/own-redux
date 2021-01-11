import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TestPage from '../pages/testPage';
import TestPage1 from '../pages/testPage1';
import Stripe from '../pages/stripe';

export default function Routing() {
    return (
        <React.Fragment>
            <Switch>
                <Route path='/stripe' exact component={Stripe}/>
                <Route path='/test-page' exact component={TestPage}/>
                <Route path='/test-page1' exact component={TestPage1}/>
            </Switch>
        </React.Fragment>
    )
}