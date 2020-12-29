import React from 'react';
import { Link } from 'react-router-dom'
import connect from '../customRedux/connect';
import { testAction } from '../redux/actions';

const Test = (props) => {
  const handleClick = () => props.testAction('from test page');
  console.log(props)
  return (
    <div>
      <h1>TEST COMPONENT</h1>
      <div>{props.testData}</div>
      <button onClick={handleClick}>Click</button>
      <Link to='/test-page1'>test-page1</Link>
    </div>
  )
}
export default connect((state) => ({testData: state?.someReducer?.testState?.someData}), {testAction})(Test);


// testData: state?.someReducer?.testState?.someData