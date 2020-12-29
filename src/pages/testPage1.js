import React from 'react';
import { Link } from 'react-router-dom';
import connect from '../customRedux/connect';
import { testAction } from '../redux/actions';

function TestPage1(props) {

    return (
        <div>
            <p>{props.data}</p>
            <button onClick={() => props.testAction('from test page 1')}>get data</button>
            <Link to='/test-page'>test-page</Link>
        </div>
    )
}

export default connect((state) => ({data: state?.someReducer?.testState?.someData}), { testAction })(TestPage1)