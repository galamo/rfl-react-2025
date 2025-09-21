# JavaScript for React and TypeScript - Complete Learning Guide

A comprehensive day-by-day curriculum covering essential JavaScript concepts for React development and TypeScript fundamentals.

## 📚 Table of Contents

- [Day 1: Async Operations](#day-1-async-operations)
- [TypeScript Fundamentals](#typescript-fundamentals)
- [Type System Deep Dive](#type-system-deep-dive)
- [Advanced TypeScript Features](#advanced-typescript-features)
- [Practical Exercises](#practical-exercises)

---

## Day 1: Async Operations

### 🎯 Learning Objectives
Master asynchronous programming patterns essential for modern React development.

### Core Concepts
1. **Callbacks** - Traditional async handling
2. **Promises** - Modern async operations
3. **Async/Await** - Syntactic sugar for promises

### 🛠️ Exercise 1: Async/Await Practice

Choose one of the following options to practice async operations:

#### Option A: Countries API Integration
**Goal**: Build a countries data analyzer

**API Endpoint**: `http://localhost:2200/countries-rfl`

**Tasks**:
- Fetch and store all country names
- Create a function to count countries by region
- Filter countries by population threshold (> 7,275,556)

**Setup**:
```bash
mkdir getCountries
cd getCountries
npm init -y
npm install axios
```

#### Option B: Random Users API
**Goal**: Build a user data processor

**API Endpoint**: `https://randomuser.me/api/?results=10`

**Tasks**:
- Store all usernames in an array
- Count users by gender
- Filter users from Canada

**Setup**:
```bash
mkdir getUsersApp
cd getUsersApp
npm init -y
npm install axios
```

---

## TypeScript Fundamentals

### 🚀 Getting Started

#### Project Setup
```bash
# Initialize project
npm init -y

# Install TypeScript (choose one)
npm install -g typescript        # Global installation
npm install typescript --save-dev  # Local development dependency

# Initialize TypeScript config
tsc --init

# Compile TypeScript
tsc

# Enable watch mode (recommended)
tsc --watch
```

### Essential Configuration
Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "start": "node dist/index.js"
  }
}
```

---

## Type System Deep Dive

### 📋 Complete Type Reference

| **Category** | **Type** | **Description** | **Example** |
|--------------|----------|-----------------|-------------|
| **Primitives** | `string` | Text data | `let name: string = "John"` |
| | `number` | Numeric values | `let age: number = 25` |
| | `boolean` | True/false values | `let active: boolean = true` |
| | `bigint` | Large integers | `let big: bigint = 123n` |
| | `symbol` | Unique identifiers | `let key: symbol = Symbol("id")` |
| **Special** | `null` | Explicit no value | `let empty: null = null` |
| | `undefined` | Uninitialized | `let notSet: undefined` |
| | `any` | Any type (avoid) | `let value: any = 42` |
| | `unknown` | Type-safe any | `let val: unknown = "test"` |
| | `void` | No return value | `function log(): void {}` |
| | `never` | Never occurs | `function fail(): never { throw new Error() }` |
| **Complex** | `array` | List of values | `let nums: number[] = [1, 2, 3]` |
| | `tuple` | Fixed-length array | `let pair: [string, number] = ["A", 1]` |
| | `object` | Non-primitive values | `let obj: object = { name: "John" }` |
| | `enum` | Named constants | `enum Status { Active, Inactive }` |
| **Advanced** | `union` | Multiple types | `let value: string \| number` |
| | `intersection` | Combined types | `type User = Name & Age` |
| | `literal` | Specific values | `let dir: "up" \| "down"` |

### 🎯 Exercise: JSON-Based Type Creation

Create comprehensive types for user data:

```json
{
  "gender": "female",
  "name": { "title": "Madame", "first": "Anja", "last": "Clement" },
  "location": {
    "street": { "number": 4446, "name": "Place du 8 Novembre 1942" },
    "city": "Finhaut",
    "state": "Fribourg",
    "country": "Switzerland",
    "postcode": 1085,
    "coordinates": { "latitude": "-55.9946", "longitude": "128.8545" },
    "timezone": { "offset": "-7:00", "description": "Mountain Time (US & Canada)" }
  },
  "email": "anja.clement@example.com",
  "login": {
    "uuid": "12627444-beb5-476a-8a01-23e03d0d20b6",
    "username": "bigdog278",
    "password": "1717",
    "salt": "3QvCBOUN",
    "md5": "5500614dbca048fd18b5e495e49513e4",
    "sha1": "2243e09b485fcd46225e3c3fffefcb8f94ed2960",
    "sha256": "ba3932e0430a2ed3046818433846c227a2e5d43b6fed8e53247cb5587954efc0"
  },
  "dob": { "date": "1996-04-04T22:39:20.516Z", "age": 28 },
  "registered": { "date": "2002-12-17T22:50:47.806Z", "age": 21 },
  "phone": "079 107 43 71",
  "cell": "077 691 98 67",
  "id": { "name": "AVS", "value": "756.6321.6815.85" },
  "picture": {
    "large": "https://randomuser.me/api/portraits/women/23.jpg",
    "medium": "https://randomuser.me/api/portraits/med/women/23.jpg",
    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/23.jpg"
  },
  "nat": "CH"
}
```

**Tasks**:
1. Create `SingleUser` type from the JSON structure
2. Create `ArrayOfUsers` type for multiple users
3. Implement proper nesting and optional properties

---

## Advanced TypeScript Features

### 🔧 Utility Types

#### Partial & Required
```typescript
interface User {
  name: string;
  email: string;
  age: number;
}

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;
```

#### Record, Pick & Omit
```typescript
// Create object with specific key-value types
type UserRecord = Record<string, number>;

// Select specific properties
type UserName = Pick<User, 'name'>;

// Exclude specific properties
type UserWithoutAge = Omit<User, 'age'>;
```

### 📐 Interfaces vs Types

#### Interface Benefits
- Declaration merging
- Extensibility
- Better error messages

```typescript
interface Animal {
  name: string;
}

interface Animal {
  species: string; // Merged with above
}

interface Dog extends Animal {
  breed: string;
}
```

### 🔀 Enums
```typescript
// Numeric enum
enum Status {
  Pending,    // 0
  Approved,   // 1
  Rejected    // 2
}

// String enum
enum Theme {
  Light = "light",
  Dark = "dark"
}

// Heterogeneous enum
enum Mixed {
  Yes = 1,
  No = "NO"
}
```

---

## Practical Exercises

### 💰 Exercise: Tax Calculator
Create a flexible tax calculation function:

```typescript
// Handle both numeric and string inputs
const tax1 = calculateTax({ price: 100, tax: 0.2 });        // 20
const tax2 = calculateTax({ price: "$200", tax: 0.15 });    // 30
```

**Requirements**:
- Accept `price` as `number` or `string` (with $ prefix)
- Return calculated tax amount
- Use proper type narrowing

### 🔌 Exercise: Connection Overloading
Implement function overloading for database connections:

```typescript
type Connection = {};

// Overload signatures
function createConnection(url: string, user: string): Connection;
function createConnection(url: string, userIdPassword: number): Connection;

// Implementation
function createConnection(url: string, userOrId: string | number): Connection {
  // Your implementation here
}
```

### 📅 Exercise: Day of Week Function
Create a type-safe day calculator:

```typescript
type DayOfWeeks = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

function getDayFromDate(date: Date): DayOfWeeks {
  // Your implementation here
}

// Usage
const date1 = new Date("2024-12-15"); // Sunday
console.log(getDayFromDate(date1)); // "Sunday"
```

---

## Advanced Concepts

### 🧬 Generics

#### Basic Generic Functions
```typescript
// Instead of multiple similar functions
function getSingleUser(users: string[]): string {
  return users[0];
}

function getSingleProduct(products: Product[]): Product {
  return products[0];
}

// Use a single generic function
function getSingleItem<T>(items: T[]): T {
  return items[0];
}
```

#### Generic Constraints
```typescript
// Constrain generic to have specific properties
function greet<T extends { name: string }>(person: T): string {
  return `Hello, ${person.name}!`;
}

const user = { name: "Alice", age: 25 };
console.log(greet(user)); // Works

const invalidUser = { age: 30 };
// console.log(greet(invalidUser)); // Error: missing 'name'
```

#### Generic Classes
```typescript
class PlayList<T> {
  private list: T[] = [];
  
  add(item: T): void {
    this.list.push(item);
  }
  
  play(): T | undefined {
    return this.list.shift();
  }
  
  getList(): readonly T[] {
    return this.list;
  }
}

// Usage
interface Song {
  artist: string;
  title: string;
  duration: number;
}

const musicPlaylist = new PlayList<Song>();
musicPlaylist.add({ artist: "Artist", title: "Song", duration: 180 });
```

### 🔍 Advanced Type Manipulation

#### Conditional Types
```typescript
type StringFromType<T> = T extends string ? string : number;

type StringResult = StringFromType<"hello">; // string
type NumberResult = StringFromType<42>;      // number
```

#### keyof Operator
```typescript
type ScanResult = {
  numberOfVulnerabilities: number;
  packages: Array<{ name: string; version: string; cve: string }>;
  priorities: string[];
  id: string;
  userScannerId: string;
};

// Exercise: Implement these functions
function getScanResultStats<K extends keyof ScanResult>(
  scan: ScanResult, 
  key: K
): ScanResult[K] {
  return scan[key];
}

function filterScans<K extends keyof ScanResult>(
  scans: ScanResult[], 
  key: K, 
  value: ScanResult[K]
): ScanResult[] {
  return scans.filter(scan => scan[key] === value);
}
```

### 📝 Input Validation with Zod

#### Setup
```bash
npm install zod
```

#### Basic Usage
```typescript
import { z } from "zod";

// Define schema
const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18).max(120).optional(),
  url: z.string().url().min(8)
});

// Infer TypeScript type from schema
type User = z.infer<typeof UserSchema>;

// Validate data
const userData = {
  name: "Alice",
  email: "alice@example.com",
  age: 25,
  url: "https://example.com"
};

// Parsing (throws on invalid data)
const validUser = UserSchema.parse(userData);

// Safe parsing (returns result object)
const result = UserSchema.safeParse(userData);
if (result.success) {
  console.log(result.data); // Valid user data
} else {
  console.error(result.error); // Validation errors
}
```

---

## 📚 Additional Resources

### Type Declaration Files (.d.ts)
- Support existing JavaScript libraries with TypeScript definitions
- Import from `@types/` packages or create custom declarations
- Use `lib.d.ts` for built-in JavaScript APIs

### String Literal Types
```typescript
type Theme = "light" | "dark" | "auto";
type ButtonSize = "small" | "medium" | "large";

function setTheme(theme: Theme): void {
  // Implementation
}

setTheme("light"); // ✅ Valid
// setTheme("blue"); // ❌ Error
```

### Best Practices
1. **Start strict**: Enable `strict` mode in `tsconfig.json`
2. **Avoid `any`**: Use `unknown` when uncertain about types
3. **Use type assertions carefully**: Prefer type guards
4. **Leverage utility types**: `Partial`, `Pick`, `Omit`, etc.
5. **Document complex types**: Add comments for clarity
6. **Test your types**: Use type-level tests

---

## 🎯 Next Steps

1. Complete all exercises in order
2. Practice with real-world APIs
3. Explore React with TypeScript
4. Learn about advanced patterns (decorators, mixins)
5. Study popular TypeScript libraries

---
