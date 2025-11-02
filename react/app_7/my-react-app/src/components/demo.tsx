"use client"; // if using Next.js 13 app directory
import { useState, useTransition } from "react";

// Simulate a large dataset
const largeArray = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function AsyncDemo() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(largeArray);
  const [isPending, startTransition] = useTransition();

  // Async filter function
  const filterData = (search: any) => {
    // Simulate heavy computation
    return largeArray.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Handler using regular useState (blocking)
  const handleChangeState = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    const result = filterData(value); // synchronous heavy filter
    setFiltered(result);
  };

  // Handler using useTransition (non-blocking)
  const handleChangeTransition = (e: any) => {
    const value = e.target.value;
    setQuery(value); // urgent update
    startTransition(() => {
      const result = filterData(value); // deferred update
      setFiltered(result);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Async Demo: useState vs useTransition</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={query}
          placeholder="Type to filter (useState)"
          onChange={handleChangeState}
        />
      </div>

      <div style={{ marginBottom: "20px", height: "40px" }}>
        <input
          type="text"
          value={query}
          placeholder="Type to filter (useTransition)"
          onChange={handleChangeTransition}
        />
        <div>
          {isPending && <span style={{ marginLeft: "10px" }}>Loading...</span>}
        </div>
      </div>

      <ul
        style={{
          maxHeight: "300px",
          overflow: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
