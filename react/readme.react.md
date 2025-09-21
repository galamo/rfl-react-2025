# React

## Table of Contents

1. **Introduction to React**
2. **Setting Up the Environment**
3. **JSX (JavaScript XML)**
4. **Components**
5. **Props**
6. **State and Hooks**
7. **Events**
8. **Conditional Rendering**
9. **Lists and Keys**
10. **Forms**
11. **Styling in React**
12. **Lifecycle Methods (Class Components)**
13. **React Router**
14. **Context API**
15. **Fetching Data (useEffect)**

---

## 1. Introduction to React

### Example:

```javascript
function App() {
  return <h1>Hello, World!</h1>;
}

export default App;
```

### Exercise:

- Creating a Vite based React Application

## `npm create vite@latest`

## 2. Setting Up the Environment

### Exercise:

- Create Client Application name: react-client-app.

## 3. JSX (JavaScript XML)

JSX allows you to write HTML-like code in JavaScript.

### Example:

```javascript
function App() {
  const name = "John";
  return <h1>Hello, {name}</h1>;
}

export default App;
```

### Exercise:

- Render a JSX elements that displays your Identity, Email, First name, last name, Address.

## 4. Components

Components are the building blocks of React. You can create functional or class-based components.

### Example (Functional Component):

```javascript
function Welcome() {
  return <h1>Welcome to React!</h1>;
}

export default Welcome;
```

### Exercise:

- Create functional component that describe a Developer Task.
- Task: title, created at, domain ( development, documentation, design)

## 5. Props

Props (short for properties) allow you to pass data to components.

### Example:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
function App() {
  return <Welcome name="Alice" />;
}
```

### Exercise:

- Create functional component that describe a Developer Task.
- Task: title - h1, created at - h3, domain (development, documentation, design)

## 6. State and Hooks

State is used to manage dynamic data. `useState` is a React Hook for adding state to functional components.

### Example:

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Exercise:

- Create a counter component that increments and decrements a number.

---

## 7. Events

React handles events similarly to DOM elements but uses camelCase syntax.

### Example:

```javascript
function ButtonClick() {
  function handleClick() {
    alert("Button clicked!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

### Exercise:

- Create a button that logs "Button Pressed" to the console when clicked.

---

## 8. Conditional Rendering

Render elements conditionally using logical operators.

### Example:

```javascript
function Greeting(props) {
  return <h1>{props.isLoggedIn ? "Welcome Back!" : "Please Sign In"}</h1>;
}
```

### Exercise:

- Render a login button only when a user is not logged in.

---

## 9. Lists and Keys

Use `.map()` to render lists. Keys help React identify elements for updates.

### Example:

```javascript
function List() {
  const items = ["Apple", "Banana", "Cherry"];
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

### Exercise:

- Display a list of your favorite movies in React.

## 10. Forms

Forms allow users to input data and interact with the application.

### Example:

```javascript
function MyForm() {
  const [input, setInput] = useState("");

  return (
    <form>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <p>You typed: {input}</p>
    </form>
  );
}
```

### Exercise:

- Create a form with an input and a submit button that logs the input value.

## 11. Styling in React

Style React components using CSS, inline styles, or CSS modules.

### Example:

```javascript
function StyledComponent() {
  const style = { color: "blue", fontSize: "20px" };
  return <h1 style={style}>Styled Text</h1>;
}
```

### Exercise:

- Create a component with a paragraph styled using CSS classes.

## 12. Lifecycle Methods (Class Components)

Lifecycle methods are available in class components, e.g., `componentDidMount`, `componentDidUpdate`.

### Example:

```javascript
class App extends React.Component {
  componentDidMount() {
    console.log("Component Mounted");
  }
  render() {
    return <h1>Hello, Lifecycle!</h1>;
  }
}
```

### Exercise:

- Add a console log when a class component mounts.

---

## 13. React Router

React Router helps create a multi-page React app with navigation.

### Example:

```javascript
import { BrowserRouter, Route, Link } from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}
```

### Exercise:

- Add navigation links to a Home and Contact page.

---

## 14. Context API

Context API provides a way to pass data through the component tree without prop drilling.

### Example:

```javascript
const MyContext = React.createContext();

function App() {
  return (
    <MyContext.Provider value="Hello">
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  const value = React.useContext(MyContext);
  return <h1>{value}</h1>;
}
```

### Exercise:

- Create a context to pass user information to a child component.

## 15. Fetching Data (useEffect)

`useEffect` is used to fetch data when the component mounts.

### Example:

```javascript
import React, { useState, useEffect } from "react";

function DataFetching() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Exercise:

- Fetch and display a list of users from an API.

---

---

### React

#### JSX (TSX)

- Embedding Expressions in JSX
- JSX is an Expression
- Specifying Attributes with JSX
- Specifying Children with JSX
- JSX Prevents Injection Attacks
- JSX Represents Objects

#### Rendering Elements

#### Components and Props

- Function and Class Components
- Rendering a Component
- Compose components
- Props

#### State

- Object
- Local Component State
- Global State

#### Lifecycle methods (L)

- Mount
- Update
- Unmount

#### Events in React

#### Conditional rendering

#### Alternative Props Concepts

- explicit key
- {...} spread operator

#### Render props

#### Ex_HOC

1. Create a component called <TextComponent> - props: text: string
2. Create a component called <InputComponent>
3. Create a withHover HOC behavior that will wrap components 1+2 and will give the ability to
   highlight the component ( change the background to selected color onMouseOver )

- withHover

#### Ex_Render_list_Items_1

- Create Country Page Component
- Create Country component - card ( show the country name, flag, population ,area)
- Use the following Api: http://localhost:2200/countries/data
- Present the results in a list.
- Add Sorting Buttons - sort by area, sort by population

#### Ex_Render_list_Items_2

- create a button which support sorting countries by area key, desc.

#### Keys

#### Lifting State up

## Hooks

- useState
- useEffect
- useRef
- useMemo
- useCallback
- useContext
- useReducer

## Custom hooks

- useApi
- useImage
- slow network bug ( debounce, isActive)

## Ex_useMemo

- Create a Statistics page based on material ui Bar chart.
- The cart will present the number of population per region.
- use useMemo - to prevent the population per region re executed.

## Ex_suspense

- Support Suspense in users page

## Controled vs unControled components

## Ref

## Portals

`createPortal(children, domNode, key?)`

1. Rendering to a different part of the DOM
2. Rendering a modal dialog with a portal
3. Rendering React components into non-React server markup
4. Rendering React components into non-React DOM nodes

## Advanced

- Redux state management
- HOC
- Buld react app - source map explorer
- Error bounderies

### EX-1

- Create your own IdCard Component
  based on your information
- `lastName`: A string
- `firstName`: A string
- `gender`: A string, 'male' or 'female'
- `height`: A number
- `birth`: A date
- `picture`: A string

```js
<IdCard
  lastName="Doe"
  firstName="John"
  gender="male"
  height={178}
  birth={new Date("1992-07-14")}
  picture="https://randomuser.me/api/portraits/men/44.jpg"
/>
```

### Keys in react

### EX useEffect

1. Create a Component that fetch's products from the following API `https://dummyjson.com/docs/products/`
2. Show the Products in the page.
3. Implement selected Product functionality which will present on the top of the page the selected Product

### EX Toggle component

1. Toggle Countries Rendering to show unmount aborting request
2. Toggle Products

### EX-Image Component

- Create an Image component
- image should get a URL string
- in case the URL is missing - present the `defaultImage`
- `defaultImage`: https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg
- advanced - check if the image is not loaded as well and show the default image

### EX-4

- style css module
- create your own style module by adding the following file to Header component

### EX-5

- Implement Toggle Products Page
- Create `ProductPage` component
- fetch the products from the following api - https://dummyjson.com/products
- Create `Product` Component
- Present all the Products in the `ProductsPage`

### EX-6

- based on your Products result
- Memoize the Avg price
- Present it as product statistics

### EX-7

- Create A button in login page: "click here to register"
- Clicking on the button will move the client ot the registration page
- Remove the register from the router

### EX-8

- implement the login component
- please see the POST Login operation

### React Router DOM

`npm install react-router-dom@6`

### useRef

- useRef
  1. current reference mutation
  2. reference to DOM
- React router DOM
- useState Vs useRef
- useContext , useReducer
- axios interceptor
- nested rotes

### Subjects

- useContext , useReducer
- nested routes

### EX - 9

- Add New Route Countries Route

## Subjects

1. code splitting
2. useReducer, useContext
3. async operations

### EX - 11 Code splitting

1. Create New Route - `Countries Reports`
2. use Code splitting approach to lazy load this component
3. Add new Component Name: `PieChartCountriesPopulation` ( based on recharts)
4. Using the countries data fetching - show every region & population on the chart
5. optimize your component load with React.memo

### EX - 12 useContext & useReducer

1. Create AppDate component which present the current date when reports loaded
2. support toggle functionality - between local and UTC
3. use Switch component `https://v4.mui.com/components/switches/`

### Subjects:

1. Redux toolkit
2. Testing

### EX - 13

Redux toolkit

1. migrate the is utc state to the setting reducer
2. create new reducer for reports and store the numbers/precentage state inside
3. implement redirect to countries reports after loginSuccess
4. move register async operation to work with redux ( async function OR thunk)

### EX - 14

1. Write a unit test for region population calculation function - `calcPopulationPerRegion`

- test correct flow
- false positive
- null / string calculation

### EX - 15

1. Write a unit-ui test for setting the user name flow in redux
2. assert that the user is rendered to the header

More topics:

- tests
- redux toolkit
- React.memo
- coucurrent
- use Reducer + useContext
- source-map-explorer
- useDefferedValue useTransition
- Dispatch

# Async operation with redux:

# Questions

### Useefffect Cleanup example

```javascript
// useEffect - side effects , call api, subscribe events, manipulate DOM
// useState - how it really works?

function App() {
  const [team, setTeam] = useState("Brazil");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function handleResize() {
      console.log("Resize-Window");
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      console.log("CleanUp");
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}
```

## Design / component

### Material UI

`npm install @mui/material @emotion/react @emotion/styled`
`npm install @mui/icons-material`

Here’s how the information can be formatted into a clean, professional README file:

---

# Styling Components in React: A Guide

This guide explores various approaches to styling components in React, helping you choose the best option for your project.

---

## Table of Contents

1. [CSS Modules](#1-css-modules)
2. [Styled Components (CSS-in-JS)](#2-styled-components-css-in-js)
3. [CSS Frameworks (e.g., Tailwind CSS)](#3-css-frameworks-eg-tailwind-css)
4. [CSS-in-JS Libraries (Emotion, Stitches, etc.)](#4-css-in-js-libraries-emotion-stitches-etc)
5. [Inline Styles](#5-inline-styles)
6. [Global Styles or Theme Providers](#6-global-styles-or-theme-providers)
7. [Preprocessors (Sass, Less)](#7-preprocessors-sass-less)
8. [Choosing the Best Approach](#choosing-the-best-approach)

---

## 1. CSS Modules

CSS Modules scope styles to specific components, avoiding global namespace collisions.

### Example:

**Button.module.css**

```css
.button {
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}
```

**Button.jsx**

```javascript
import styles from "./Button.module.css";

const Button = () => <button className={styles.button}>Click Me</button>;
```

### Pros:

- No global namespace conflicts.
- Works with existing CSS.
- Easy integration with CRA and Vite.

### Cons:

- Requires a build step.
- Limited dynamic styling.

---

## 2. Styled Components (CSS-in-JS)

Styled Components use tagged template literals for component-level styling.

### Example:

```javascript
import styled from "styled-components";

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: darkblue;
  }
`;

const App = () => <Button>Click Me</Button>;
```

### Pros:

- Fully scoped styles.
- Supports dynamic styling and theming.
- Great developer experience with auto-completion.

### Cons:

- Runtime overhead.
- Larger bundle size.

---

## 3. CSS Frameworks (e.g., Tailwind CSS)

Utility-first frameworks like Tailwind CSS enable rapid development with pre-defined classes.

### Example:

```javascript
const Button = () => (
  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
    Click Me
  </button>
);
```

### Pros:

- Fast prototyping.
- Highly customizable.
- Small CSS bundle with purging unused styles.

### Cons:

- JSX can get cluttered.
- Requires learning utility class names.

---

## 4. CSS-in-JS Libraries (Emotion, Stitches, etc.)

Emotion and similar libraries offer CSS-in-JS features like Styled Components but focus on performance or ergonomics.

### Example (Emotion):

```javascript
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const buttonStyle = css`
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: darkblue;
  }
`;

const Button = () => <button css={buttonStyle}>Click Me</button>;
```

---

## 5. Inline Styles

Inline styles are simple and dynamic but lack advanced CSS features.

### Example:

```javascript
const Button = () => (
  <button
    style={{
      backgroundColor: "blue",
      color: "white",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
    }}
  >
    Click Me
  </button>
);
```

### Pros:

- No external files needed.
- Easy to use for dynamic styles.

### Cons:

- No pseudo-classes (`:hover`, `:focus`).
- Lacks advanced CSS features like media queries.

---

## 6. Global Styles or Theme Providers

Global styles and theme providers are ideal for managing shared styles.

### Example:

```javascript
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const theme = {
  colors: {
    primary: "blue",
  },
};

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <button style={{ color: theme.colors.primary }}>Themed Button</button>
  </ThemeProvider>
);
```

## Choosing the Best Approach

| Use Case                             | Recommended Method           |
| ------------------------------------ | ---------------------------- |
| Small Projects                       | CSS Modules or Inline Styles |
| Component Libraries / Design Systems | Styled Components or Emotion |
| Fast Prototyping                     | Tailwind CSS                 |
| Complex Apps with Theming            | Styled Components or Emotion |
| Team Preferences                     | Align with team familiarity  |

---

# Styled Components Exercise

install dependencies

```cmd
npm install styled-components
npm install --save-dev @types/styled-components
```

### README: Styling Components Exercise

---

## Exercises: Styling in React

This README provides two short exercises to help you practice **Styled Components** and **CSS Modules** in React.

---

### Exercise 1: Styled Components - Create a Card Component

#### Objective

Design a **Card Component** using Styled Components with dynamic styles passed as props.

#### Requirements

1. Create a `Card` component that displays:
   - A title.
   - A description.
   - A customizable background color.
   - Image - optional
2. Use Styled Components to style the `Card`.
3. Pass `bgColor` as a prop to dynamically set the background color.

#### Output

You will see three cards, each with a different background color.

---

### Exercise 2: CSS Modules - Create a Button Component

#### Objective

Design a reusable **Button Component** using **CSS Modules** with scoped styles.

#### Requirements

1. Create a `Button` component styled using CSS Modules.
2. Include styles for:
   - Default state.
   - Hover state.
   - Active state.
3. Pass a `variant` prop to dynamically apply a different style.

#### Instructions

1. **Set Up CSS Modules**:
   Ensure your React project supports CSS Modules (e.g., CRA supports `.module.css` files by default).

2. **Create the CSS Module File**:
   **`Button.module.css`**

   ```css
   .button {
     background-color: blue;
     color: white;
     padding: 10px 20px;
     border: none;
     border-radius: 5px;
     cursor: pointer;
     transition: background-color 0.3s;
   }

   .button:hover {
     background-color: darkblue;
   }

   .button:active {
     background-color: navy;
   }

   .secondary {
     background-color: gray;
   }
   ```

3. **Create the Button Component**:
   **`Button.tsx`**

   ```tsx
   import React from "react";
   import styles from "./Button.module.css";

   interface ButtonProps {
     variant?: "secondary";
     children: React.ReactNode;
   }

   const Button: React.FC<ButtonProps> = ({ variant, children }) => {
     const className =
       variant === "secondary" ? styles.secondary : styles.button;
     return <button className={className}>{children}</button>;
   };

   export default Button;
   ```

4. **Render the Button Component**:
   **`App.tsx`**

   ```tsx
   import React from "react";
   import Button from "./Button";

   const App = () => (
     <div>
       <Button>Primary Button</Button>
       <Button variant="secondary">Secondary Button</Button>
     </div>
   );

   export default App;
   ```

#### Output

You will see two buttons:

- A **primary button** with blue background.
- A **secondary button** with gray background.

---

Here’s a `README.md` file with examples and exercises for `useMemo` and `useCallback`.

---

# React Hooks: `useMemo` and `useCallback`

## `useMemo`

### Description

The `useMemo` hook is used to optimize performance by memoizing expensive computations. It only recalculates the result when its dependencies change.

### Example: Factorial Calculator

```typescript
import React, { useState, useMemo } from "react";

const CalculatorExample = () => {
  const [number, setNumber] = useState(0);
  const [theme, setTheme] = useState("light");

  const longCalc = useMemo(() => {
    console.log("Calculating factorial...");
    const longCalculation = (n: number): number => {
      return Math.random() * 9999 + number;
    };
    return longCalculation(number);
  }, [number]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "20px",
      }}
    >
      <h2>Example</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <h3>value: {longCalc}</h3>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default CalculatorExample;
```

---

### Exercise: `useMemo`

1. Add a feature to the long calculation to compute the sum of all numbers up to the given number (e.g., for input 5, the result should be 15).
2. Use `useMemo` to memoize the sum calculation.
3. Log when the sum is recalculated.

---

## `useCallback`

### Description

The `useCallback` hook is used to memoize functions so they don't get recreated unnecessarily, particularly useful when passing callbacks to child components.

---

### Example: Increment Button

```tsx
import React, { useState, useCallback } from "react";

const IncrementButton = React.memo(
  ({ increment }: { increment: () => void }) => {
    console.log("Button rendered!");
    return <button onClick={increment}>Increment</button>;
  }
);

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <IncrementButton increment={increment} />
    </div>
  );
};

export default Counter;
```

---

### Exercise: `useCallback`

1. Modify the `Counter` example to include a decrement button. Use `useCallback` to memoize the decrement function.
2. Pass the decrement function to a child component and confirm that it doesn’t re-render unnecessarily.

---

## Best Practices for `useMemo` and `useCallback`

1. **When to Use:**

   - Use `useMemo` for expensive computations that you want to avoid recalculating unless necessary.
   - Use `useCallback` for passing functions as props to child components to prevent unnecessary re-renders.

2. **Avoid Overuse:**

   - Only use these hooks when optimization is required. Premature optimization can make your code harder to read and maintain.

3. **Debugging:**
   - Use tools like React Developer Tools to check when components re-render.

---

## Routing

Here’s a `README.md` file with the explanations for the React Router DOM components:

---

# React Router DOM Components

React Router DOM is a library for handling client-side routing in React applications. This document provides a concise explanation of its key components.

---

## Components Overview

### **1. BrowserRouter**

- **Purpose**: Enables client-side routing using the browser’s History API.
- **Example**:

  ```tsx
  import { BrowserRouter } from "react-router-dom";

  <BrowserRouter>
    <App />
  </BrowserRouter>;
  ```

---

### **2. Routes**

- **Purpose**: Groups all the `Route` components to define routing paths.
- **Example**:

  ```tsx
  import { Routes, Route } from "react-router-dom";

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>;
  ```

---

### **3. Route**

- **Purpose**: Defines a specific path and the component to render for that path.
- **Props**:
  - `path`: URL path to match.
  - `element`: Component to render when the path matches.
- **Example**:
  ```tsx
  <Route path="/contact" element={<Contact />} />
  ```

---

### **4. Link**

- **Purpose**: Renders a navigation link that updates the URL without refreshing the page.
- **Props**:
  - `to`: The path to navigate to.
- **Example**:

  ```tsx
  import { Link } from "react-router-dom";

  <Link to="/about">Go to About</Link>;
  ```

---

### **5. NavLink**

- **Purpose**: Similar to `Link`, but adds styling to indicate the active route.
- **Props**:
  - `to`: The path to navigate to.
  - `className`: Dynamically applies a class to the active link.
- **Example**:

  ```tsx
  import { NavLink } from "react-router-dom";

  <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
    Home
  </NavLink>;
  ```

---

### **6. Outlet**

- **Purpose**: Acts as a placeholder for rendering child routes in a nested routing setup.
- **Example**:

  ```tsx
  import { Routes, Route, Outlet } from "react-router-dom";

  const Dashboard = () => (
    <div>
      <h2>Dashboard</h2>
      <Outlet />
    </div>
  );

  <Routes>
    <Route path="/dashboard" element={<Dashboard />}>
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Routes>;
  ```

---

### **7. useNavigate**

- **Purpose**: Provides a function to programmatically navigate between routes.
- **Example**:

  ```tsx
  import { useNavigate } from "react-router-dom";

  const Home = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
      navigate("/profile");
    };

    return <button onClick={goToProfile}>Go to Profile</button>;
  };
  ```

---

### **8. useParams**

- **Purpose**: Access route parameters from the URL.
- **Example**:

  ```tsx
  import { useParams } from "react-router-dom";

  const Profile = () => {
    const { userId } = useParams();

    return <h1>User ID: {userId}</h1>;
  };
  ```

---

### **9. useLocation**

- **Purpose**: Provides information about the current URL, including `pathname` and `search`.
- **Example**:

  ```tsx
  import { useLocation } from "react-router-dom";

  const CurrentLocation = () => {
    const location = useLocation();

    return <p>Current Path: {location.pathname}</p>;
  };
  ```

---

### **10. useMatch**

- **Purpose**: Matches the current location to a specific route pattern.
- **Example**:

  ```tsx
  import { useMatch } from "react-router-dom";

  const MatchRoute = () => {
    const match = useMatch("/about");

    return match ? (
      <p>You are on the About page!</p>
    ) : (
      <p>Not on About page.</p>
    );
  };
  ```

### Ex - new route

1. add new routes to the application: CountriesReports

# Subjects:

1. Context, useReducer.
2. Suspense - Lazy loading
3. Redux
4. dockerizing the client application
5. useTransition

# useContext & useReducer

### Settings Page

1. implement settings toggle button

### EX

1. Support new feature in the Setting page.
2. The feature will change number format, for example, 1000 => 1K , use https://www.npmjs.com/package/millify
3. in the settings page add button - readable pretty number - on/off
4. in case the button is on - so the number will be presented as 1K
5. otherwise, keep the regular long numbers.

## Part 3: Suspense and Concurrent Features in React

### **1. Suspense**

`Suspense` is a React component that allows you to handle loading states for lazy-loaded components or asynchronous operations. It displays a fallback UI while the requested component is being loaded.

#### Key Points:

- Works with React’s `lazy` function to load components dynamically.
- Provides a better user experience by showing fallback content during loading.

#### Example:

```jsx
import React, { Suspense, lazy } from "react";

// Lazy load the component
const CarDetails = lazy(() => import("./CarDetails"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CarDetails />
  </Suspense>
);

export default App;
```

### **2. Concurrent Features**

React’s concurrent features allow React to interrupt rendering to handle more important updates, like user interactions, providing a smoother user experience.

#### Key Points:

- Improves responsiveness for complex apps.
- Works seamlessly with `Suspense` for handling asynchronous tasks.

#### Example:

Concurrent features are enabled automatically with `ReactDOM.createRoot`.

```jsx
import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

const CarDetails = lazy(() => import("./CarDetails"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CarDetails />
  </Suspense>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

---

## Summary

- **Suspense** simplifies lazy loading and provides fallback UI for better user experience.
- **Concurrent features** improve responsiveness by prioritizing rendering tasks.
- Use `Suspense` with `lazy` to optimize component loading in your app.


# Support Lazy loading
- support lazy loading the Reports Component