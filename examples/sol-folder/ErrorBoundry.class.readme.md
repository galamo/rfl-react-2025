```javascript
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", color: "red" }}>
          <h2>Something went wrong.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}
```

Why Error Boundaries MUST Be Class Components:
The Technical Reasons:

Lifecycle Methods Required: Error boundaries need two specific lifecycle methods that don't exist for functional components:

static getDerivedStateFromError(error) - Updates state to show fallback UI
componentDidCatch(error, errorInfo) - Logs error information

Synchronous Error Catching: Errors during rendering must be caught synchronously. React Hooks execute after rendering, so they can't catch render-time errors.
No Hook Equivalent: As of React 19, there is no useErrorBoundary hook or similar. The React team has stated this is a design decision because:

Error boundaries need to intercept errors from children before they propagate
This requires lifecycle integration at a level hooks don't provide
Hooks are for side effects and state, not error interception

State Update Timing: Error boundaries need to update their own state in response to errors in descendant components, which requires the special error lifecycle methods.

The demo includes a working example where you can click a button to throw an error and see the error boundary catch it and display the fallback UI!
