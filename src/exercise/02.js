// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Container({children}) {
  const [count, setcount] = React.useState(0)
  const counterPlus = () => setcount(c => c + 1)
  const counterMinus = () => setcount(c => c - 1)

  return React.Children.map(children, child =>
    React.cloneElement(child, {count, counterPlus, counterMinus}),
  )
}

function One({count}) {
  return count === 3 ? <p>this one comp: {count}</p> : null
}
function Two({count}) {
  return <p>this two comp: {count}</p>
}
function Three({count}) {
  return <p>this three comp: {count}</p>
}

function BtnPlus({counterPlus}) {
  return <button onClick={counterPlus}>Plus 1</button>
}

function BtnMinus({counterMinus}) {
  return <button onClick={counterMinus}>Minus 1</button>
}

function App() {
  return (
    <div>
      <Container>
        <One />
        <Two />
        <Three />
        <BtnPlus />
        <BtnMinus />
      </Container>
    </div>
  )
}

export default App
