# CRUD User API

A RESTful API service for managing user resources with full CRUD (Create, Read, Update, Delete) operations.

## Features

- Create new users with name, email and age
- Retrieve single or all users
- Update existing user information
- Delete users
- API documentation with Swagger/OpenAPI
- Request logging
- MongoDB database integration

## Tech Stack

- Node.js + TypeScript
- Express.js
- MongoDB with Mongoose
- Swagger/OpenAPI for documentation
- Morgan for request logging

## API Documentation

The API documentation is available at `/api/v1/docs` when running the server. It provides detailed information about:

- Available endpoints
- Request/response formats
- Example payloads
- Response codes

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Access the API documentation at `http://localhost:3000/api/v1/docs`