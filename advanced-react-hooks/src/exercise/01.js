// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const countReducer= (previousState, newState) => {
  if(typeof newState === 'function'){
    return newState(previousState)
  }
  switch(newState.type){
    case 'INCREMENT':
      return {
        ...previousState,
        count: previousState.count + newState.step
      }
    default:
      return previousState
  }
}

function Counter({initialCount = 0, step = 3}) {
  
  const [state, dispatch] = React.useReducer(countReducer, {count: initialCount})
  
  const { count }= state
  const increment = () => dispatch({ type:'INCREMENT', step })
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
