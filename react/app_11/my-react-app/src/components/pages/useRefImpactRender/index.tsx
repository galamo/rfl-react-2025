import { useRef, useState } from "react";
export default function UseRefRender() {
  return <Counter />;
}

function Counter() {
  const renderCount = useRef(0);
  const [count, setCount] = useState(0);

  const incrementCount1 = () => {
    // setCount(count + 1);
    renderCount.current += 1; // No Re-render trigger
    console.log("Render count ref:", renderCount.current);
  };

  const incrementCount2 = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>State count: {count}</p>
      <p>Ref render count (doesn't trigger render): {renderCount.current}</p>
      <button onClick={incrementCount2}>Increment</button>
      <button onClick={incrementCount1}>Increment No Render</button>
    </div>
  );
}
