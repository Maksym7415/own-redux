import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from '../customRedux/hooks'
import { testAction } from '../redux/actions';

const Test = (props) => {
  const dispatch = useDispatch();
  const testData = useSelector(({ someReducer }) => someReducer.testState.someData);
  const handleClick = () => dispatch(testAction('from test page'));
  return (
    <div>
      <h1>TEST COMPONENT</h1>
      <div>{testData}</div>
      <button onClick={handleClick}>Click</button>
      <Link to='/test-page1'>test-page1</Link>
    </div>
  )
}
export default Test;


// testData: state?.someReducer?.testState?.someData