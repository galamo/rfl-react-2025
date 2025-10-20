import { useState } from "react";
import "./App.css";
import { CounterTest } from "./components/counter-test";
import { CountriesPage } from "./components/pages/countries";
import { Route, Routes } from "react-router-dom";
import NavigationHeader from "./components/navigation-header";
import AsyncDemo from "./components/demo";

function App() {
  const [show, setShow] = useState(true);
  return (
    <>
      <div>
        <NavigationHeader />
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setShow(!show)}> Show/Hide </button>
          {show ? <CounterTest /> : null}
        </div>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/countries" element={<CountriesPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
