// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

const ToggleContext= React.createContext({})
ToggleContext.displayName= 'ToggleContext'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // return React.Children.map(children, child => {
  //   return typeof child.type === 'string'
  //     ? child
  //     : React.cloneElement(child, {on, toggle})
  // })

  console.log('children', children);

  const [ele, setEle]= React.useState(null);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {setTimeout(() => setEle(children), 2000)}
      {ele}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  const context = React.useContext(ToggleContext)
  if(!context){
    throw new Error('Please use ToggleContext inside its provider')
  }
  return React.useContext(ToggleContext)
}

function ToggleOn({children}) {
  console.log('Hello, Anand is the best')
  const { on }= useToggle()
  return <>
  {on ? children : null}
  </>
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const { on }= useToggle()
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({...props}) {
  const { on, toggle }= useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

// const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
