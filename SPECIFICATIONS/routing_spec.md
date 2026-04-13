# Routing Specification: etecGamesRemake-frontend

## Overview
This document outlines the routing structure and navigation flow of the etecGamesRemake-frontend application. It describes how different pages are organized and accessed within the React application.

## Router Configuration

### Main Routes (src/App.jsx)
The application uses React Router v6 with the following main routes:

1. **Home Page**
   - Path: `/`
   - Component: `Index`

2. **Login Page**
   - Path: `/login`
   - Component: `Login`

3. **User Profile Page**
   - Path: `/profile/:username`
   - Component: `Profile`

4. **Games Listing Page**
   - Path: `/games`
   - Component: `Games`

5. **Add New Game Page**
   - Path: `/games/new`
   - Component: `AddGame`

6. **404 Error Page**
   - Path: `*`
   - Component: `NotFound`

## Route Structure and Navigation

### Protected Routes
- `/games/new` requires authentication
- `/profile/:username` may require authentication depending on user context

### Dynamic Routes
- `/profile/:username` - User profile page with username parameter
- `/games/:id` - Individual game detail page (not explicitly defined but implied by API usage)

## Navigation Flow

### User Journey
1. **Landing**: Users start at home page (`/`)
2. **Authentication**: 
   - Users navigate to `/login` for authentication
3. **Browsing Games**:
   - Navigate to `/games` to browse games
4. **Adding Games**:
   - Navigate to `/games/new` to add new games (requires login)
5. **User Profiles**:
   - Navigate to `/profile/:username` to view user profiles

### Navigation Components
- **Navbar**: Provides top-level navigation links
- **Footer**: May contain additional navigation links
- **Page-specific Links**: Internal links within pages for navigation

## Route Parameters and Query Strings

### Dynamic Parameters
- `:username` - Username parameter in profile routes
- `:id` - Game ID parameter (implied by API usage)

### Query Parameters
The GameList component uses query parameters:
- `current_page` - Current pagination page number
- `section` - Section filter for game listings
- `username` - Username filter for user-specific games

## Route Handling Logic

### Authentication Flow
1. Access to protected routes (`/games/new`) is controlled by AuthContext
2. Unauthenticated users are redirected to `/login` when trying to access protected routes
3. Successful login redirects back to the originally requested page

### Error Handling
- Wildcard route `*` handles all undefined paths
- NotFound component displays 404 error page

## Component Integration with Routing

### Page Components
Each route maps to a specific page component:
- `Index` - Home page content
- `Login` - Authentication form
- `Profile` - User profile display
- `Games` - Game listing and browsing
- `AddGame` - Game submission form
- `NotFound` - Error page

### Sub-components
- GameList component is used within Games and Profile pages
- Navbar and Footer are present on all routes

## Routing Best Practices

### URL Structure
- Clean, semantic URLs
- Consistent naming conventions
- Meaningful path segments

### Performance Considerations
- Route-based code splitting
- Efficient component loading
- Proper handling of route transitions

### Accessibility
- Semantic HTML structure in navigation
- Proper link labeling
- Keyboard navigable routes

## Future Routing Considerations

### Additional Routes to Consider
1. `/games/:id` - Individual game detail page
2. `/search` - Search functionality page
3. `/categories` - Category browsing page
4. `/favorites` - User favorites page

### Advanced Routing Features
- Nested routes for complex page structures
- Route guards for advanced authentication
- Lazy loading for better performance
- Route metadata for SEO and analytics

This routing specification provides a clear understanding of how navigation works throughout the application and serves as a reference for future route additions or modifications.