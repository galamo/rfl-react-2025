# React - Complete Development Guide

A comprehensive guide covering React fundamentals through advanced patterns, hooks, routing, state management, and modern development practices.

## Table of Contents

- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
- [Component Patterns](#component-patterns)
- [Hooks Deep Dive](#hooks-deep-dive)
- [Routing & Navigation](#routing--navigation)
- [State Management](#state-management)
- [Styling Solutions](#styling-solutions)
- [Performance Optimization](#performance-optimization)
- [Advanced Patterns](#advanced-patterns)
- [Testing](#testing)
- [Production & Deployment](#production--deployment)

---

## Getting Started

### Environment Setup

#### Create a New React Application

```bash
# Using Vite (Recommended)
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev

# Alternative: Create React App
npx create-react-app my-app --template typescript
cd my-app
npm start
```

#### Essential Dependencies

```bash
# Core routing
npm install react-router-dom

# State management
npm install @reduxjs/toolkit react-redux

# Styling
npm install styled-components
npm install @emotion/react @emotion/styled

# UI Framework
npm install @mui/material @mui/icons-material

# HTTP client
npm install axios

# Form handling
npm install react-hook-form

# Validation
npm install zod
```

### First React Component

```tsx
// App.tsx
import React from "react";

function App(): JSX.Element {
  const appName = "My React App";

  return (
    <div className="app">
      <h1>Welcome to {appName}!</h1>
      <p>Your journey with React begins here.</p>
    </div>
  );
}

export default App;
```

#### Exercise: Personal Profile Component

Create a component that displays:

- Full name
- Email address
- Location
- Brief bio
- Profile image

---

## Core Concepts

### JSX (JavaScript XML)

JSX allows you to write HTML-like syntax in JavaScript, providing a declarative way to describe UI.

#### Key JSX Rules:

1. Must return a single parent element or Fragment
2. Use `className` instead of `class`
3. All tags must be closed
4. Use camelCase for event handlers

```tsx
// Good JSX practices
function UserProfile({ user }: { user: User }) {
  return (
    <div className="user-profile">
      <img src={user.avatar} alt={`${user.name}'s avatar`} className="avatar" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      {user.isOnline && <span className="online-indicator">Online</span>}
    </div>
  );
}
```

### Components Architecture

#### Functional Components (Recommended)

```tsx
interface TaskProps {
  title: string;
  createdAt: Date;
  domain: "development" | "documentation" | "design";
  isCompleted?: boolean;
  onToggle?: () => void;
}

const DeveloperTask: React.FC<TaskProps> = ({
  title,
  createdAt,
  domain,
  isCompleted = false,
  onToggle,
}) => {
  return (
    <article className={`task ${isCompleted ? "completed" : ""}`}>
      <h1>{title}</h1>
      <h3>Created: {createdAt.toLocaleDateString()}</h3>
      <span className={`domain domain--${domain}`}>{domain}</span>
      {onToggle && (
        <button onClick={onToggle}>
          {isCompleted ? "Mark Incomplete" : "Mark Complete"}
        </button>
      )}
    </article>
  );
};
```

#### Exercise: Task Management

Create a `TaskList` component that:

1. Displays multiple `DeveloperTask` components
2. Allows toggling task completion status
3. Filters tasks by domain
4. Shows task statistics

### Props and Component Composition

Props enable data flow from parent to child components, creating reusable and flexible components.

```tsx
// Parent Component
function TaskDashboard() {
  const tasks = [
    {
      id: 1,
      title: "Implement user authentication",
      createdAt: new Date("2024-01-15"),
      domain: "development" as const,
      isCompleted: false,
    },
    {
      id: 2,
      title: "Write API documentation",
      createdAt: new Date("2024-01-16"),
      domain: "documentation" as const,
      isCompleted: true,
    },
  ];

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>
      {tasks.map((task) => (
        <DeveloperTask
          key={task.id}
          title={task.title}
          createdAt={task.createdAt}
          domain={task.domain}
          isCompleted={task.isCompleted}
        />
      ))}
    </div>
  );
}
```

---

## Component Patterns

### State Management with useState

```tsx
import React, { useState } from "react";

interface CounterProps {
  initialValue?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="counter-controls">
        <button onClick={decrement}>-{step}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+{step}</button>
      </div>
    </div>
  );
};
```

### Event Handling

```tsx
function InteractiveButton() {
  const [clickCount, setClickCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked!", event);
    setClickCount((prev) => prev + 1);
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`interactive-btn ${isPressed ? "pressed" : ""}`}
    >
      Clicked {clickCount} times
    </button>
  );
}
```

### Conditional Rendering

```tsx
interface AuthStatusProps {
  user?: { name: string; role: string } | null;
  isLoading?: boolean;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ user, isLoading }) => {
  if (isLoading) {
    return <div className="loading">Checking authentication...</div>;
  }

  return (
    <div className="auth-status">
      {user ? (
        <div className="user-info">
          <span>Welcome back, {user.name}!</span>
          <span className="role">{user.role}</span>
          <button className="logout-btn">Logout</button>
        </div>
      ) : (
        <div className="guest-actions">
          <button className="login-btn">Sign In</button>
          <button className="register-btn">Register</button>
        </div>
      )}
    </div>
  );
};
```

### Lists and Keys

```tsx
interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
}

const MovieList: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  return (
    <div className="movie-list">
      <h2>Favorite Movies</h2>
      {movies.length === 0 ? (
        <p>No movies in your list yet.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <span className="year">({movie.year})</span>
              </div>
              <div className="movie-meta">
                <span className="genre">{movie.genre}</span>
                <span className="rating">⭐ {movie.rating}/10</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Exercise: Add sorting, filtering, and search functionality
```

### Form Handling

```tsx
import React, { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
```

---

## Hooks Deep Dive

### useEffect - Side Effects Management

```tsx
import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`);
        }

        const userData = await response.json();

        if (!cancelled) {
          setUser(userData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup function
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
```

#### useEffect Cleanup Example

```tsx
function WindowSize() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array = runs once on mount

  return (
    <div>
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
    </div>
  );
}
```

### useMemo - Performance Optimization

```tsx
import React, { useState, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const ProductAnalytics: React.FC<{ products: Product[] }> = ({ products }) => {
  const [sortBy, setSortBy] = useState<"name" | "price">("name");

  // Expensive calculation memoized
  const analytics = useMemo(() => {
    console.log("Calculating analytics...");

    const avgPrice =
      products.reduce((sum, p) => sum + p.price, 0) / products.length;
    const maxPrice = Math.max(...products.map((p) => p.price));
    const minPrice = Math.min(...products.map((p) => p.price));

    const categoryCounts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      avgPrice: avgPrice.toFixed(2),
      maxPrice,
      minPrice,
      totalProducts: products.length,
      categories: categoryCounts,
    };
  }, [products]); // Recalculates only when products change

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === "price") {
        return b.price - a.price;
      }
      return a.name.localeCompare(b.name);
    });
  }, [products, sortBy]);

  return (
    <div className="product-analytics">
      <div className="analytics-summary">
        <h3>Product Statistics</h3>
        <p>Total Products: {analytics.totalProducts}</p>
        <p>Average Price: ${analytics.avgPrice}</p>
        <p>
          Price Range: ${analytics.minPrice} - ${analytics.maxPrice}
        </p>
      </div>

      <div className="sort-controls">
        <button
          onClick={() => setSortBy("name")}
          className={sortBy === "name" ? "active" : ""}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("price")}
          className={sortBy === "price" ? "active" : ""}
        >
          Sort by Price
        </button>
      </div>

      <div className="product-list">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product-item">
            <span>{product.name}</span>
            <span>${product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### useCallback - Function Memoization

```tsx
import React, { useState, useCallback, memo } from "react";

// Memoized child component
const TaskItem = memo<{
  task: { id: number; title: string; completed: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}>(({ task, onToggle, onDelete }) => {
  console.log(`TaskItem ${task.id} rendered`);

  return (
    <div className="task-item">
      <span className={task.completed ? "completed" : ""}>{task.title}</span>
      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
});

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build a project", completed: false },
  ]);

  // Memoized callbacks prevent unnecessary re-renders
  const handleToggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return (
    <div className="task-manager">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      ))}
    </div>
  );
};
```

### useRef - DOM References and Mutable Values

```tsx
import React, { useRef, useEffect, useState } from "react";

const FocusableInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Track render count without causing re-renders
  useEffect(() => {
    renderCount.current += 1;
  });

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <p>Component rendered {renderCount.current} times</p>
      <input ref={inputRef} type="text" placeholder="I'm focused on mount!" />
      <button onClick={handleFocusInput}>Focus Input</button>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
    </div>
  );
};
```

### Custom Hooks

```tsx
// Custom hook for API calls
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Custom hook for image loading
function useImageLoader(src: string, fallbackSrc: string) {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      setHasError(false);
    };

    img.onerror = () => {
      setImageSrc(fallbackSrc);
      setIsLoaded(true);
      setHasError(true);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  return { imageSrc, isLoaded, hasError };
}

// Usage example
const ImageComponent: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  const defaultImage = "https://via.placeholder.com/300x200?text=No+Image";
  const { imageSrc, isLoaded, hasError } = useImageLoader(src, defaultImage);

  return (
    <div className="image-container">
      {!isLoaded && <div className="image-placeholder">Loading...</div>}
      <img
        src={imageSrc}
        alt={alt}
        className={`image ${isLoaded ? "loaded" : "loading"} ${
          hasError ? "error" : ""
        }`}
      />
      {hasError && <p className="error-text">Failed to load original image</p>}
    </div>
  );
};
```

---

## Routing & Navigation

### React Router Setup

```bash
npm install react-router-dom
```

```tsx
// App.tsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <ErrorBoundary>
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />

                {/* Products routes */}
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />

                {/* Protected routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Redirects */}
                <Route path="/home" element={<Navigate to="/" replace />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </BrowserRouter>
  );
};
```

### Navigation Component

```tsx
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">MyApp</Link>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Products
          </NavLink>
        </li>
      </ul>

      <div className="nav-actions">
        <span className="current-path">Path: {location.pathname}</span>
      </div>
    </nav>
  );
};
```

### Route Parameters and Navigation Hooks

```tsx
import React from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const view = searchParams.get("view") || "details";

  const handleBackToProducts = () => {
    navigate("/products", { replace: false });
  };

  const handleViewChange = (newView: string) => {
    setSearchParams({ view: newView });
  };

  return (
    <div className="product-detail">
      <button onClick={handleBackToProducts}>← Back to Products</button>

      <h1>Product {id}</h1>

      <div className="view-controls">
        <button
          onClick={() => handleViewChange("details")}
          className={view === "details" ? "active" : ""}
        >
          Details
        </button>
        <button
          onClick={() => handleViewChange("reviews")}
          className={view === "reviews" ? "active" : ""}
        >
          Reviews
        </button>
      </div>

      {view === "details" && <div>Product details content...</div>}
      {view === "reviews" && <div>Product reviews content...</div>}
    </div>
  );
};
```

### Protected Routes

```tsx
import React, { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Auth Context
interface AuthContextType {
  user: { name: string; role: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    if (username === "admin" && password === "password") {
      setUser({ name: "Admin User", role: "admin" });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

---

## State Management

### Context API with useReducer

```tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// State types
interface AppState {
  theme: 'light' | 'dark';
  isUtcTime: boolean;
  user: { name: string; email: string } | null;
  notifications: Array<{ id: string; message: string; type: 'info' | 'error' | 'success' }>;
}

// Action types
type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_TIME_FORMAT' }
  | { type: 'SET_USER'; payload: { name: string; email: string } | null }
  | { type: 'ADD_NOTIFICATION'; payload: { message: string; type: 'info' | 'error' | 'success' } }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

// Initial state
const initialState: AppState = {
  theme: 'light',
  isUtcTime: false,
  user: null,
  notifications: []
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOGGLE_TIME_FORMAT':
      return { ...state, isUtcTime: !state.isUtcTime };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now().toString(), ...action.payload }
        ]
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };

    default:
      return state;
  }
}

// Context
const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('
```
