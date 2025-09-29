import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("gal,yulia");

  function longCalculation() {
    console.log("Long calculation");
    const users = user.split(",");
    return users;
  }

  const usersToShow = longCalculation();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {usersToShow.map((item) => (
          <h1>{item}</h1>
        ))}
      </div>
      <ExpensiveComponent name={user} />
    </>
  );
}

export default App;

function ExpensiveComponent({ name }: { name: strring }) {
  console.log("Rendering <ExpensiveComponent>");

  // This is pure: depends only on `name`
  const reversed = name.split("").reverse().join("");

  console.log("Expensive calculation for:", name);

  return <h2>{reversed}</h2>;
}
