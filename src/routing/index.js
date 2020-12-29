import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TestPage from '../pages/testPage';
import TestPage1 from '../pages/testPage1';

export default function Routing() {
    console.log('rooter')
    return (
        <React.Fragment>
            <Switch>
                <Route path='/test-page' exact component={TestPage}/>
                <Route path='/test-page1' exact component={TestPage1}/>
            </Switch>
        </React.Fragment>
    )
}