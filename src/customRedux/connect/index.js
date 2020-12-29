import React, {useContext} from 'react';
import { dispatch, state } from '../index';
import Context from '../../provider/context';

function connect(mapStateToProps, mapDispatchToProps) {
  console.log('connect')
  return function (Component) {
    return (props) => {
      // const context = useContext(Context)
      // console.log('connect', context)
      const newProps = {...props}
      if (mapDispatchToProps) {
        Object.keys(mapDispatchToProps).forEach((action) => newProps[action] = (data) => dispatch(mapDispatchToProps[action](data)));
      }
      if (mapStateToProps) {
        const targetData = mapStateToProps(state);
        Object.keys(targetData).forEach((name) => newProps[name] = targetData[name])
      }
      console.log('connect')
      return <Component {...newProps} />
    }
  }
} 

export default connect;