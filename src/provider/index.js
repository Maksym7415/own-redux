import React, { useEffect, useMemo, useState } from 'react';
import { state } from '../customRedux';
import Context from './context';

function Provider({store, children}) {
  // console.log(props.store.getState())
  const [localState, setLocalState] = useState(0);

  const handleClick = () => setLocalState((prev) => prev + 1)

  const contextValue = useMemo(() => {
    return {
      rerender: () => {
        console.log('RERENDER')
        setLocalState((prev) => ++prev)
      }
    }
  }, [store]);

  const previousState = useMemo(() => store.getState(), [store]);

  useEffect(() => {
    store.subscribe = contextValue.rerender
  }, [contextValue]);

  console.log(children)

  return (
    <>
    {console.log('provider')}
      <Context.Provider value={{...store, ...contextValue}}>{children}</Context.Provider>
    </>
  )
}

export default Provider;