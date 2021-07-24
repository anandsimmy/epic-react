// useState: greeting


import * as React from 'react'

function Greeting({ initialName= '' }) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  
  const array= React.useState(initialName)

  const name= array[0]
  const setName= array[1]

  const nameRef= React.useRef()

  function handleChange() {
    setName(nameRef.current.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input ref={nameRef} onChange={handleChange} id="name" defaultValue={initialName} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName='John' />
}

export default App
