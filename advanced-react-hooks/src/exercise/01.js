// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const countReducer= (previousState, newState) => {
  if(typeof newState === 'function'){
    return newState(previousState)
  }
  console.log('hello', previousState, newState);
  return {
    ...previousState,
    ...newState
  }
}

function Counter({initialCount = 0, step = 2}) {
  
  const [state, setState] = React.useReducer(countReducer, {count: initialCount})
  
  const { count }= state
  const increment = () => setState((currentState) => ({ ...currentState, count: currentState.count + step }))
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
