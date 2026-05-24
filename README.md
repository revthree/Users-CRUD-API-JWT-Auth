A Node.js REST API for user registration, login, profile management, role-based access control, and password/username updates.

## Built With

- Node.js
- Express 5
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- express-validator
- cookie-parser
- morgan

## Requirements

- Node.js 18+ (or compatible)
- MongoDB database

## Setup
1. Install dependencies:

   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with these values:

   ```env
   PORT=
   DB_URI=
   JWT_KEY=your_jwt_secret
   ```
3. Start the app in development mode:

   ```bash
   npm run start-dev
   ```

4. The server listens on the port configured in `PORT`.

### Authentication

- `POST /api/auth/register`
  - Registers a new user.
  - Request body: `{ "username": "...", "password": "...", "role": "ADMIN" | "USER" }`
  - Responds with created user data.

- `POST /api/auth/login`
  - Logs in a user.
  - Request body: `{ "username": "...", "password": "..." }`
  - Sets an `authToken` cookie for authenticated requests.

- `GET /api/auth/logout`
  - Logs out the current user by clearing the `authToken` cookie.


### User Endpoints

- `GET /api/users/me`
  - Returns the authenticated user profile.
  - Requires valid `authToken` cookie.

- `GET /api/users`
  - Returns all users.
  - Requires authentication and `ADMIN` role.

- `DELETE /api/users/me`
  - Deletes the logged-in user.
  - Requires valid `authToken` cookie.

- `PATCH /api/users/:id/role`
  - Updates the role of a user by ID.
  - Requires authentication and `ADMIN` role.

- `PATCH /api/users/me/password`
  - Updates the authenticated user password.
  - Request body: `{ "oldPass": "...", "newPass": "..." }`

- `PATCH /api/users/me/username`
  - Updates the authenticated user username.
  - Request body: `{ "newUsername": "..." }`
  

## Authentication Notes

- Authentication uses a cookie named `authToken`.
- Protected routes require a valid JWT stored in this cookie.
- JWT verification uses `JWT_KEY` from `.env`.

- 
