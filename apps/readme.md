# API & MySQL Course Project

A comprehensive Node.js API server with MySQL database integration, built as a learning resource and practical reference for course participants.

## 🚀 Features

- RESTful API with Express.js
- MySQL database integration
- Interactive API documentation with Swagger UI
- Docker containerization for easy deployment
- Comprehensive test suite
- Health check endpoint for monitoring

## 📋 Prerequisites

- **For Docker**: Docker and Docker Compose installed
- **For Local Development**: Node.js (v16+) and MySQL server

## 🐳 Quick Start with Docker (Recommended)

The fastest way to get up and running:

```bash
# Navigate to the apps directory
cd apps

# Start all services with Docker Compose
docker compose up --build
```

### Verify Installation

1. **Check container status**: Monitor the logs to ensure all containers start successfully
2. **Health check**: Visit [http://localhost:3000/hc](http://localhost:3000/hc)
3. **API Documentation**: Navigate to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) and select `Root server`

## 💻 Local Development Setup

For development work or if you prefer running locally:

```bash
# Navigate to the API directory
cd apps/api

# Install dependencies
npm install

# Start the application (includes database setup)
npm run all
```

### Verify Local Installation

1. **Health check**: Visit [http://localhost:3000/hc](http://localhost:3000/hc)
2. **API Documentation**: Navigate to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) and select `Root server`

## 🧪 Running Tests

Tests can be executed against either a local server or Docker containers:

```bash
# Navigate to the API directory
cd apps/api

# Install dependencies (if not already done)
npm install

# Option 1: Start local server
npm run all

# Option 2: Or use Docker (from apps directory)
# docker compose up --build

# Run the test suite
npm run test
```

The test results will display in your terminal, showing passed/failed tests and coverage information.

## 📁 Project Structure

```
apps/
├── api/                 # Main API application
│   ├── src/            # Source code
│   ├── tests/          # Test files
│   ├── package.json    # Dependencies and scripts
│   └── ...
├── docker-compose.yml  # Docker services configuration
└── ...
```

## 🔧 Available Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run all`  | Start the complete application stack |
| `npm run test` | Execute the test suite               |
| `npm install`  | Install project dependencies         |

## 🌐 API Endpoints

Go to: apps/api/readme.md

## 🆘 Troubleshooting

### Common Issues

- **Port conflicts**: Ensure port 3000 is available
- **Docker issues**: Try `docker compose down` then `docker compose up --build`
- **Database connection**: Check MySQL service status in Docker logs
