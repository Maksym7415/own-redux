import React, { useEffect, useMemo, useState } from 'react';
import { state } from '../customRedux';
import Context from './context';

function Provider({store, children}) {
  // const [localState, setLocalState] = useState(0);


  // const contextValue = useMemo(() => {
  //   return {
  //     rerender: () => {
  //       setLocalState((prev) => ++prev)
  //     }
  //   }
  // }, [store]);

  return (
    <>
    {children}
      {/* <Context.Provider value={{...store, ...contextValue}}>{<children.type/>}</Context.Provider> */}
    </>
  )
}

export default Provider;