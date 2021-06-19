// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState= ( key, defaultValue= '', { serialize= JSON.stringify, deserialize= JSON.parse }= {} ) => {

  const [state, setState] = React.useState(() => {
    if(window.localStorage.getItem(key)){
      return deserialize(window.localStorage.getItem(key))
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef= React.useRef(key)

  React.useEffect(() => {
    const prevKey= prevKeyRef.current
    if(prevKey !== key){
      window.localStorage.removeItem(prevKey)  
    }
    prevKeyRef.current= key
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName]= useLocalStorageState('name', initialName)
  // const [name, setName]= React.useState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName='Hello Guys' />
}

export default App
