# 🌍 Countries Playground API

This module provides demo endpoints for working with **countries data**, including artificial delays for testing frontend resilience.

Base path (mounted in main server):

```
/api/data
```

---

## 📂 Endpoints

### 1. Get all countries (local JSON)

**GET** `/api/data/countries-rfl`

Returns country data from the local `index.json` file.

**Response example:**

```json
[
  {
    "name": { "common": "Israel" },
    "cca2": "IL",
    "region": "Asia"
  },
  {
    "name": { "common": "France" },
    "cca2": "FR",
    "region": "Europe"
  }
]
```

---

### 2. Search countries by name (with artificial delay)

**GET** `/api/data/countries-delay/name/:name`

- Filters countries from local JSON by `name` (case-insensitive).
- Artificial delay is added **every second request**.

**Parameters:**

| Name   | In   | Required | Description                        |
| ------ | ---- | -------- | ---------------------------------- |
| `name` | path | ✅       | Name or partial name of a country. |

**Example:**

```http
GET /api/data/countries-delay/name/isr
```

**Response:**

```json
{
  "result": [
    {
      "name": { "common": "Israel" },
      "cca2": "IL",
      "region": "Asia"
    }
  ]
}
```

---

### 3. Get country by ISO code (live data)

**GET** `/api/data/countries/code/:code`

Fetches real-time country information from the public [restcountries.com](https://restcountries.com/) API.

**Parameters:**

| Name   | In   | Required | Description                                 |
| ------ | ---- | -------- | ------------------------------------------- |
| `code` | path | ✅       | ISO 3166-1 alpha-2 or alpha-3 country code. |

**Example:**

```http
GET /api/data/countries/code/IL
```

**Response:**

```json
{
  "data": [
    {
      "name": { "common": "Israel" },
      "cca2": "IL",
      "region": "Asia",
      "capital": ["Jerusalem"]
    }
  ]
}
```

---

### 4. Get all countries (delayed)

**GET** `/api/data/countries-delay`

- Returns local `index.json` country list.
- Response is delayed by **1 second** to simulate slow API.

**Response example:**

```json
{
  "data": [
    { "name": { "common": "Israel" }, "cca2": "IL" },
    { "name": { "common": "France" }, "cca2": "FR" }
  ]
}
```

---

## ⚠️ Notes

- Endpoints are **public** (no authentication required).
- Designed for **frontend testing** (delays, filtering, external API integration).
- Data source:

  - Local JSON → `data/index.json`
  - External API → [restcountries.com](https://restcountries.com/)

---
