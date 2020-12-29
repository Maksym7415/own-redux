import React from 'react';
import connect from '../customRedux/connect';
import { testAction } from '../redux/actions';

const Test = (props) => {
  const handleClick = () => props.testAction('New data');
  console.log(props)
  return (
    <div>
      <h1>TEST COMPONENT</h1>
      {/* <div>{props.testData}</div> */}
      <button onClick={handleClick}>Click</button>
    </div>
  )
}
export default connect((state) => ({testData: state}), {testAction})(Test);


// testData: state?.someReducer?.testState?.someData