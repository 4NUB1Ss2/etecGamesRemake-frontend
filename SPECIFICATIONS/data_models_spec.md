# Data Models Specification: etecGamesRemake-frontend

## Overview
This document outlines the data models used throughout the etecGamesRemake-frontend application. It describes the structure and relationships of the key data entities that are handled by the frontend components and communicated with the backend API.

## Game Model

### Structure
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

### Properties
- **id**: Unique identifier for the game
- **title**: Name of the game (required)
- **description**: Detailed description of the game (required)
- **genre**: Genre classification of the game (required)
- **releaseDate**: Release date of the game (optional)
- **platforms**: Array of platforms the game is available on (optional)
- **developer**: Name of the game developer (optional)
- **publisher**: Name of the game publisher (optional)
- **imageUrl**: URL to the game's image/thumbnail (optional)
- **createdAt**: Timestamp when the game was created
- **updatedAt**: Timestamp when the game was last updated

### Usage in Application
- Displayed in GameList component
- Used in AddGame form for creation
- Used in Games page for browsing
- Retrieved from API endpoints

## User Model

### Structure
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

### Properties
- **id**: Unique identifier for the user
- **username**: User's chosen username (required)
- **email**: User's email address (required)
- **profilePicture**: URL to user's profile picture (optional)
- **bio**: User's biography or description (optional)
- **createdAt**: Timestamp when the user account was created
- **updatedAt**: Timestamp when the user profile was last updated

### Usage in Application
- Displayed in Profile component
- Used in AuthContext for authentication state
- Retrieved from API endpoints
- Updated via Profile page form

## Pagination Model

### Structure
```json
{
  "current_page": "number",
  "last_page": "number",
  "per_page": "number",
  "total": "number",
  "data": ["Game"]
}
```

### Properties
- **current_page**: Current page number in pagination
- **last_page**: Total number of pages available
- **per_page**: Number of items per page
- **total**: Total number of items available
- **data**: Array of game objects for current page

### Usage in Application
- Returned by API endpoints for game listings
- Used by GameList component for pagination controls
- Handled in GameList component state management

## Authentication Model

### Structure
```json
{
  "token": "string",
  "user": "User"
}
```

### Properties
- **token**: JWT token for API authentication
- **user**: User object containing user details

### Usage in Application
- Returned from login endpoint
- Stored in localStorage
- Used by AuthContext for authentication state
- Applied to all API requests via axios interceptor

## Form Data Models

### Add Game Form
```json
{
  "title": "string",
  "description": "string",
  "genre": "string",
  "releaseDate": "date",
  "platforms": ["string"],
  "developer": "string",
  "publisher": "string",
  "imageUrl": "string"
}
```

### Login Form
```json
{
  "username": "string",
  "password": "string"
}
```

## Data Flow and Relationships

### API Communication
1. **Game List**: `/games` endpoint returns paginated game data
2. **Single Game**: `/games/:id` endpoint returns single game details
3. **User Profile**: `/users/profile` endpoint returns current user data
4. **User by Username**: `/users/:username` endpoint returns specific user data

### Component Data Flow
1. **GameList** component fetches games and displays them in a grid
2. **Profile** component displays user information
3. **AddGame** component creates new game entries
4. **AuthContext** manages authentication state across components

## Data Validation

### Frontend Validation
- Required fields are validated before form submission
- Format validation for dates, emails, etc.
- Empty state handling for API responses

### Backend Validation
- All data is validated on the server side
- Error responses from API include validation messages
- Consistent error response format across endpoints

## Data Persistence

### Local Storage
- Authentication token stored in localStorage
- Session persistence between page reloads

### Component State
- Temporary data managed within components using React hooks
- Pagination state managed in GameList component
- Form state managed in form components

## Future Data Model Considerations

### Additional Models to Consider
1. **Category Model**: For game categorization
2. **Review Model**: User reviews for games
3. **Favorite Model**: User favorite games relationships
4. **Platform Model**: Platform information for games

### Data Structure Enhancements
- Nested objects for complex data relationships
- Enum values for standardized fields (genres, platforms)
- Enhanced validation rules for better user experience

This specification provides a comprehensive overview of the data models used in the application and ensures consistency in how data is structured, validated, and handled throughout the frontend.