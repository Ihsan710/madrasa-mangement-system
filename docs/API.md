# API Reference

This document outlines the core RESTful API endpoints for the Madrasa Management System.

## Base URL
`/api/v1`

## Endpoints

### Authentication
- `POST /auth/login` - Authenticates a user and returns a JWT token.
- `POST /auth/register` - Registers a new user (admin/citizen).

### Users
- `GET /users/me` - Retrieves the profile of the currently authenticated user.
- `PUT /users/me` - Updates the profile details.

### Admin
- `GET /admin/stats` - Fetches dashboard statistics (requires Admin role).

*(Note: API is actively evolving. This is a baseline reference).*
