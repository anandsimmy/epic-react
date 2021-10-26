// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const getTogglerProps = (props) => {
    return {
      'aria-pressed': on,
      onClick: toggle,
      ...props,
    }
  }
  return {on, getTogglerProps}
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
      {...getTogglerProps({
        'aria-label': 'custom-button',
        id: 'custom-button-id',
        onClick: ()=>console.log('hello, Anand is the best')
      })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
