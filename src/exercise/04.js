// Prop Collections and Getters
// http://localhost:3000/isolated/final/04.js

import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // a utility fn that take multiple fns and return a new fn that call all
  // fns with provided arguments.
  // this allow multiple onClick handlers
  function callAll(...fns) {
    return (...args) => {
      fns.forEach(fn => {
        fn && fn(...args)
      })
    }
  }

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      // onClick: () => {
      //   onClick && onClick()
      //   toggle
      // },
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    toggle,
    getTogglerProps,
  }
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}
export default App
