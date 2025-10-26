```javascript
function withAuth(Component) {
  return function AuthWrapper(props) {
    const token = localStorage.getItem("token");
    if (!token) return null; // or fallback UI
    return <Component {...props} />;
  };
}
```

```javascript
import { Navigate } from "react-router-dom";

function AuthWrapper({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage:
<AuthWrapper>
  <Dashboard />
</AuthWrapper>;
```
