import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import getUsersNumber from './utils'
import { HeaderApp } from './components/header-app'
import { CounterTest } from './components/counter-test'
import { CountriesPage } from './components/pages/countries'


function App() {
  const [show, setShow] = useState(true)
  return (
    <>
      <button onClick={() => setShow(!show)}> Show/Hide </button>
      {show ? <CounterTest /> : null}
      <CountriesPage />
    </>
  )
}

export default App
