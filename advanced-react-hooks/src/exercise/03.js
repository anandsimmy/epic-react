// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext= React.createContext();

const useCount = () => {
    const context = React.useContext(CountContext)
    if(!context){
      throw new Error('useCount must be used within a CountProvider')
    }
    return context
};

const CountProvider= ({ children }) => {

  const [count, setCount]= React.useState(0);

  return(
    <CountContext.Provider value={[ count, setCount ]}>
      {children}
    </CountContext.Provider>
  )
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const [ count ] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const [, setCount ] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
