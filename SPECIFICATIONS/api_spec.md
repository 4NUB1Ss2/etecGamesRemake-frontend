# API Endpoints Specification: etecGamesRemake-frontend

## Overview
This document outlines the API endpoints used by the frontend application to communicate with the backend services. The application uses Axios for HTTP requests and expects a token-based authentication system.

## Base URL
The API base URL is configured via environment variable:
```
baseURL: import.meta.env.VITE_API_URL
```

## Authentication
All API requests require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```
Token is stored in localStorage and automatically added to all requests.

## Available Endpoints

### Authentication Endpoints
- **POST /auth/login** - User login
- **POST /auth/register** - User registration (not shown in current frontend)

### Games Endpoints
- **GET /games** - Retrieve list of games
- **GET /games/:id** - Retrieve specific game details
- **POST /games** - Create new game (requires authentication)
- **PUT /games/:id** - Update existing game (requires authentication)
- **DELETE /games/:id** - Delete game (requires authentication)

### User Endpoints
- **GET /users/profile** - Get current user profile (requires authentication)
- **GET /users/:username** - Get user profile by username
- **PUT /users/profile** - Update current user profile (requires authentication)

## Request/Response Format

### Common Response Structure
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

### Error Response Structure
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## HTTP Status Codes
- **200 OK** - Successful GET, PUT, DELETE requests
- **201 Created** - Successful POST requests
- **400 Bad Request** - Invalid request data
- **401 Unauthorized** - Authentication required or invalid token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

## Data Models

### Game Model
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "genre": "string",
  "releaseDate": "date",
  "platforms": ["string"],
  "developer": "string",
  "publisher": "string",
  "imageUrl": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### User Model
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "profilePicture": "string",
  "bio": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## Rate Limiting
The API implements rate limiting to prevent abuse. Details are configured on the backend.

## Security Considerations
- All endpoints require HTTPS in production
- Sensitive data is not sent in URLs
- Authentication tokens are stored securely in localStorage
- Input validation is performed on all endpoints

This specification provides a comprehensive overview of how the frontend communicates with the backend services.