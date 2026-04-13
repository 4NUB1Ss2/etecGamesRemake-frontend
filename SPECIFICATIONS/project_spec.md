# Project Specification: etecGamesRemake-frontend

## Overview
This is a React.js frontend application built with Vite for managing games. The application includes user authentication, game browsing, and game management features.

## Project Structure
```
etecGamesRemake-frontend/
├── package.json          # Project dependencies and scripts
├── index.html            # Main HTML template with root div
├── src/                  # Source code directory
│   ├── main.jsx          # Entry point for the app
│   ├── App.jsx           # Main application component with routing
│   ├── components/       # Reusable UI components (Navbar, Footer)
│   ├── pages/            # Page components (Index, Login, Profile, Games, etc.)
│   ├── contexts/         # React context providers (AuthContext)
│   ├── services/         # API service files
│   └── assets/           # Static assets
├── public/               # Public assets directory
└── vite.config.js        # Vite configuration
```

## Technology Stack
- **Framework**: React.js (v19.2.0)
- **Build Tool**: Vite (v7.3.1)
- **Routing**: react-router-dom (v7.13.1)
- **Styling**: Bootstrap 5.3.8 with custom CSS
- **Analytics**: Vercel Analytics
- **Linting**: ESLint with React hooks and refresh plugins

## Key Features
1. **Authentication System**
   - User login/logout functionality
   - Protected routes using AuthContext
   - User profile management

2. **Routing Structure**
   - Home page (/)
   - Login page (/login)
   - User profile (/profile/:username)
   - Games listing (/games)
   - Add new game (/games/new)

3. **Core Functionality**
   - Browse games
   - View individual game details
   - Add new games to the database
   - User authentication and authorization

## Entry Points
- **Main Entry**: `src/main.jsx`
- **App Component**: `src/App.jsx`
- **Authentication Context**: `src/contexts/AuthContext.jsx`

## Development Dependencies
- TypeScript (not actively used in this version)
- ESLint with React hooks plugin
- Vite for development server and build process

## Deployment
The application uses Vite for building and can be deployed to any static hosting service.