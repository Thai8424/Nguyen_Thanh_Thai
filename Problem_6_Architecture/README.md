# Scoreboard API Service

This module provides an API service for managing and displaying user scores on a website's scoreboard. It includes functionality for updating scores, retrieving the top 10 scores, and ensuring secure score updates.

## Features
- Scoreboard Display: Retrieves the top 10 user scores.
- Live Updates: Supports live updates of the scoreboard.
- Score Update: Allows users to update their scores upon completing specific actions.
- Security: Prevents unauthorized score updates.

## API Endpoints
1. Retrieve Top 10 Scores
 - Endpoint: /api/scores/top
 - Method: GET
 - Description: Retrieves the top 10 user scores.
 - Headers:
   + Content-Type: application/json
   + Authorization: Bearer <token> (for authentication)
 - Response:
   + Status Code: 200 OK
 - Errors:
   + 401 Unauthorized: If the token is missing or invalid.
   + 500 Internal Server Error: If there is an issue retrieving scores from the database.
2. Update User Score
 - Endpoint: /api/scores/update
 - Method: POST
 - Description: Updates the score for a user based on a completed action.
 - Headers:
   + Content-Type: application/json
   + Authorization: Bearer <token> (for authentication)
 - Request Body:
   + Fields:
     * userId (string, required): The ID of the user whose score needs to be updated.
     * action (string, required): The action completed by the user that warrants a score update.
 - Response:
   + Status Code: 200 OK
 - Errors:
   + 400 Bad Request: If userId or action is missing or invalid.
   + 401 Unauthorized: If the token is missing or invalid.
   + 403 Forbidden: If the action is not valid or authorized for score update.
   + 500 Internal Server Error: If there is an issue updating the score in the database.

## Detailed Flow for Score Update
 - Authentication: Ensure that the API request includes a valid JWT token in the Authorization header. Use middleware to handle token validation.
 - Action Validation: Implement a function to validate the action parameter to ensure it is legitimate and authorized.
 - Score Calculation: Define a logic to calculate the new score based on the completed action.
 - Database Update: Update the user's score in the database.
 - Response: Send the updated score back to the client.
## Detailed Flow for Retrieving Top 10 Scores
 - Authentication: Ensure that the API request includes a valid JWT token in the Authorization header. Use middleware to handle token validation.
 - Cache Check: Check if the top 10 scores are available in the cache.
 - Database Query: If the cache is empty or expired, query the database for the top 10 scores.
 - Cache Update: Update the cache with the retrieved top 10 scores.
 - Response: Send the top 10 scores back to the client.
 
## Security Measures
 - Authentication Middleware: Use middleware to validate JWT tokens for all API requests.
 - Action Validation: Implement a service to validate the actions before updating the score.
 - Rate Limiting: Use a rate-limiting middleware to prevent abuse.
 - Input Sanitization: Sanitize all inputs to prevent injection attacks.