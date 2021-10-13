// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle(props) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // my way
  // return (
  //   <>
  //     <ToggleOn on={on}>The button is on</ToggleOn>
  //     <ToggleOff on={on}>The button is off</ToggleOff>
  //     <ToggleButton on={on} toggle={toggle}/>
  //   </>
  // )

  // console.log(React.Children.map(props.children, (child) => {
  //   return React.cloneElement(child, {
  //     on, toggle
  //   })
  // }) );

  // console.log(props.children.map((child) => {
  //   return React.cloneElement(child, {
  //     on, toggle
  //   })
  // }))

  
  return React.Children.map(props.children, (child) => {
    if(allowedtypes.includes(child.type)) {
      return React.cloneElement(child, {
        on, toggle
      })
    }
    return child
  })
}

// 🐨 Flesh out each of these components

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({ on, children }) => on ? children : null

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({ on, children }) => on ? null : children

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />

const allowedtypes = [ToggleOn, ToggleOff, ToggleButton]

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
