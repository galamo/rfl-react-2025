```javascript
import { useState, memo } from "react";

// WITHOUT React.memo - re-renders every time parent updates
const UserCardWithoutMemo = ({ name, email }) => {
  console.log("UserCardWithoutMemo rendered");
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600">{email}</p>
    </div>
  );
};

// WITH React.memo - only re-renders when props change
const UserCardWithMemo = memo(({ name, email }) => {
  console.log("UserCardWithMemo rendered");
  return (
    <div className="p-4 border border-blue-300 rounded-lg bg-blue-50">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600">{email}</p>
    </div>
  );
});

// WITH React.memo and custom comparison function
const ExpensiveCard = memo(
  ({ user, metadata }) => {
    console.log("ExpensiveCard rendered");
    return (
      <div className="p-4 border border-green-300 rounded-lg bg-green-50">
        <h3 className="font-bold text-lg">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500">ID: {user.id}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);

export default function App() {
  const [count, setCount] = useState(0);
  const [userProps] = useState({
    name: "John Doe",
    email: "john@example.com",
  });
  const [userObject] = useState({
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">React.memo Demo</h1>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment Counter: {count}
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Click to trigger parent re-render. Check console to see which
            components re-render.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Without React.memo</h2>
          <p className="text-sm text-gray-600 mb-2">
            Re-renders every time parent updates, even though props don't change
          </p>
          <UserCardWithoutMemo name={userProps.name} email={userProps.email} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">With React.memo</h2>
          <p className="text-sm text-gray-600 mb-2">
            Only re-renders when props actually change
          </p>
          <UserCardWithMemo name={userProps.name} email={userProps.email} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">With Custom Comparison</h2>
          <p className="text-sm text-gray-600 mb-2">
            Uses custom logic to determine if re-render is needed
          </p>
          <ExpensiveCard
            user={userObject}
            metadata={{ lastUpdated: Date.now() }}
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
          <h3 className="font-bold mb-2">Open your browser console!</h3>
          <p className="text-sm">
            Click the counter button and watch the console logs to see which
            components re-render. Only "UserCardWithoutMemo" should log on each
            click.
          </p>
        </div>
      </div>
    </div>
  );
}
```
