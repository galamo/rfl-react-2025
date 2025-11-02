import React from "react";
import { use } from "react";

// Async request that sometimes throws an error
async function fetchUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/99999");
  if (!res.ok) {
    throw new Error("User not found!");
  }
  return res.json();
}

export default function UserProfile() {
  const user = use(fetchUser()); // ✅ Unwraps promise and may throw error

  return (
    <div>
      <h2>User Profile</h2>
      <p>✅ Fetched Successfully!</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProfile from "./UserProfile";
import React, { Suspense } from "react";

function ErrorFallback({ error }) {
  return (
    <div style={{ color: "red" }}>
      <h3>⚠️ Error Loading Data</h3>
      <p>{error.message}</p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <UserProfile />
      </Suspense>
    ),
    errorElement: <ErrorFallback />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
