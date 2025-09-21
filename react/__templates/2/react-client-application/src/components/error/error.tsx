import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode; // Fallback UI component
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback; // Use the provided fallback UI
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
