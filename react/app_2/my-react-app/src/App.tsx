import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import getUsersNumber from './utils'
import { HeaderApp } from './components/header-app'
import { CounterTest } from './components/counter-test'


function App() {
  const [show, setShow] = useState(true)
  return (
    <>
      <button onClick={() => setShow(!show)}> Show/Hide </button>
      {show ? <CounterTest /> : null}
      <HeaderApp text={`Login App Page `} color='red' />
    </>
  )
}

export default App
