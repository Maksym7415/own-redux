import React from 'react';
import { dispatch, state } from '../index';

function connect(mapStateToProps, mapDispatchToProps) {
  return function (Component) {
    return (props) => {
      const newProps = {...props}
      if (mapDispatchToProps) {
        Object.keys(mapDispatchToProps).forEach((action) => newProps[action] = (data) => dispatch(mapDispatchToProps[action](data)));
      }
      if (mapStateToProps) {
        const targetData = mapStateToProps(state);
        Object.keys(targetData).forEach((name) => newProps[name] = targetData[name])
      }
      return <Component {...newProps} />
    }
  }
} 

export default connect;