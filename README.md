# Blog Post API

A simple Express + MongoDB API for managing blog articles with JWT-based authentication and role-based authorization. Normal users (role 2) can view articles, and admins (role 1) can create and manage content.

https://roadmap.sh/projects/personal-blog

## Features
- Authentication: JWT login with bcrypt password hashing
- Authorization: Role-based access control middleware
- Articles: List all articles, get one by id (users), add new article (admin)
- Users: Register and login endpoints
- MongoDB: Mongoose models for `Article`, `User`, and an auto-increment `Counter`

## Tech Stack
- Node.js, Express (ES Modules)
- MongoDB, Mongoose
- JWT (`jsonwebtoken`), `bcrypt`
- `dotenv`, `cors`, `express-validator`
- Dev: `nodemon`

## Project Structure
```
controllers/
  adminFunctions.js
  register.js
  userFunctions.js
middlewares/
  auth.js
model/
  counters.js
  schema.js
  user.js
routes/
  admin.js
  user.js
index.js
database.js
package.json
```

## Prerequisites
- Node.js 18+
- MongoDB running locally or a connection string to a MongoDB instance

## Environment Variables
Create a `.env` file at the project root with:
```
PORT=4000
MONGO_URL=mongodb://localhost:27017/
JWT_SECRET=change-me-to-a-strong-secret
```
Notes:
- The app reads `MONGO_URL`, `JWT_SECRET`, and optional `PORT`.
- Ensure `.env` is not committed to version control in real projects.

## Install & Run
Install dependencies:
```cmd
npm install
```
Run with nodemon:
```cmd
npm run runs
```
Or run directly:
```cmd
node index.js
```
The server starts on `http://localhost:<PORT>` (default 4000).

## API Overview
Base URLs set in `index.js`:
- User routes base: `/api`
- Admin routes base: `/`

Auth header for protected routes:
- Header: `token: <JWT>`

### Auth & User
- POST `/api/register`
  - Body: `{ username, firstname, lastname, email, password }`
  - Registers a new user with default role `2` (standard user)
- POST `/api/login`
  - Body: `{ username, password }` where `username` can be email or username
  - Returns: `{ success, message, token }`

### User Articles (role <= 2)
- GET `/api/home`
  - Header: `token: <JWT>`
  - Returns list of article titles: `{ articles: [{ article }] }`
- GET `/api/article/:id`
  - Header: `token: <JWT>`
  - Returns article content by numeric `id`

### Admin Articles (role <= 1)
- GET `/admin`
  - Header: `token: <JWT>`
  - Returns list of article titles (admin view)
- GET `/edit/:id`
  - Header: `token: <JWT>`
  - Intended to fetch a single article for editing
- POST `/new`
  - Header: `token: <JWT>`
  - Body: `{ article, articleContent }`
  - Creates a new article; uses a `Counter` to auto-increment `id`

## Middleware
- `authentication` (middlewares/auth.js)
  - Verifies JWT from header `token` and attaches `req.user`
- `autherization(Role)` (middlewares/auth.js)
  - Allows access if the numeric user role is `<= Role`
  - Example: `autherization(2)` → users and admins; `autherization(1)` → admins only

## Data Models
- `Article` (model/schema.js): `{ id: Number, article: String, articleContent: String, creationDate: Date }`
- `User` (model/user.js): `{ username, email, firstname, lastname, password, role=2 }`
- `Counter` (model/counters.js): `{ seq_name, seq_value }` for auto-increment sequences

## Development Notes
- Requests expect/return JSON and the app uses `express.json()`.
- CORS is enabled globally via `cors()`.
- Validation is set up in the register controller via `express-validator` (ensure validators are applied where needed).
- JWTs are signed with `JWT_SECRET` and expire in 15 minutes in the login flow.

## Quick Test Flow
1. Register a user via `POST /api/register`.
2. Login via `POST /api/login` to get a JWT.
3. Call user endpoints with `token` header.
4. To test admin endpoints, set the user `role` to `1` in the DB.

## License
ISC
