import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from '../customRedux/hooks'
import { testAction } from '../redux/actions';

function TestPage1(props) {
    const state = useSelector(({someReducer}) => someReducer.testState.someData);
    const dispatch = useDispatch();
    //console.log(state);
    return (
        <div>
            <p>{state}</p>
            <button onClick={() => dispatch(testAction('from test page 1'))}>get data</button>
            <Link to='/test-page'>test-page</Link>
        </div>
    )
}

export default TestPage1; // hooks