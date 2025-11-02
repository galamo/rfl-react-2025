//@ts-nocheck
import { useState } from "react";
import "./App.css";
import { CounterTest } from "./components/counter-test";
import { CountriesPage } from "./components/pages/countries";


function App() {
  const [show, setShow] = useState(true);
  return (
    <>
      <button onClick={() => setShow(!show)}> Show/Hide </button>
      {show ? <CounterTest /> : null}
      <CountriesPage />
    </>
  );
}

export default App;
