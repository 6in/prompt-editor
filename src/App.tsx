import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BlockEditor from './block-editer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BlockEditor></BlockEditor>
    </>
  )
}

export default App
