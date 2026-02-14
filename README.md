# Blog Post API
=======

https://roadmap.sh/projects/personal-blog

A simple Express + MongoDB API for managing blog articles with JWT-based authentication and role-based authorization. Normal users (role 2) can view articles, and admins (role 1) can create and manage content.


## Features
- Authentication: JWT login with bcrypt password hashing
- Authorization: Role-based access control middleware
- Articles: List all articles, get one by id (users), add new article (admin)
- Users: Register and login endpoints
- MongoDB: Mongoose models for `Article`, `User`, and an auto-increment `Counter`
=======
Roadmap project: https://roadmap.sh/projects/personal-blog

Express + MongoDB REST API with JWT authentication and simple role-based authorization.
>>>>>>> 562d60f (1-Modifications on the article schema. Removal of the counters)

## Tech Stack
- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- Auth: JWT (jsonwebtoken) + bcrypt
- Utilities: dotenv, cors

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB instance (local or remote)

### Environment Variables
Create a `.env` file in the project root:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/<db-name>
JWT_SECRET=replace-with-a-strong-secret
```

Notes:
- The code reads `MONGO_URI`, `JWT_SECRET`, and optional `PORT`.
- This repo currently contains a `.env`. If it includes a real secret, rotate it.

### Install

```bash
npm install
```

### Run (dev)

```bash
npm run runs
```

The server listens on `http://localhost:${PORT}` (defaults to 4000).

## Seed Data (optional)

There is a simple seed script that inserts the articles from `data.json`:

```bash
node dataInsertion.js
```

It connects using `MONGO_URI` and inserts `data.json.articles` into the `Article` collection.

## Authentication & Authorization

### Token header
Protected routes expect the JWT in a custom header:

```
token: <JWT>
```

### Roles
- New users default to role `2`.
- Admin access is role `1`.
- Authorization logic is: allow when `user.role <= requiredRole`.

JWTs issued by login expire in 15 minutes.

## API

Routes are mounted like this:
- User/auth routes: `/api` (see routes/user.js)
- Admin routes: `/` (see routes/admin.js)

### Auth

#### POST /api/register
Registers a new user.

Body:
```json
{
  "username": "jdoe",
  "firstname": "John",
  "lastname": "Doe",
  "email": "jdoe@example.com",
  "password": "secret"
}
```

#### POST /api/login
Logs in with either email or username.

Body:
```json
{ "username": "jdoe@example.com", "password": "secret" }
```

Response:
```json
{ "success": true, "message": "Logged in successfully!", "token": "..." }
```

### User article endpoints (requires role 1 or 2)

#### GET /api/home?page=0
Returns articles (paginated).

- Query: `page` (number). The code uses `skip(page * 10).limit(10)`.
- Response: `{ "articles": [...] }`

#### GET /api/article/:id
Returns a single article by MongoDB `_id`.

- Path param: `id` must be the document `_id` (ObjectId string)
- Response is the result of a Mongoose `find(...)` call (an array)

### Admin endpoints (requires role 1)

#### GET /admin
Returns a list of articles.

#### GET /edit/:id
Currently wired to the same handler as `GET /admin`.

#### POST /new
Inserts many articles.

Body:
```json
{
  "data": [
    { "title": "A", "content": "B", "category": "C", "tags": ["x"] }
  ]
}
```

Response:
```json
{ "message": "data inserted!" }
```

## Data Models

### Article
Stored in MongoDB as `Article`:

```js
{
  id: Number,           // optional
  title: String,
  content: String,
  category: String,
  tags: Array,
  creationDate: Date
}
```

### User
Stored in MongoDB as `User`:

```js
{
  username: String,
  email: String,
  firstname: String,
  lastname: String,
  password: String,     // bcrypt hash
  role: Number          // defaults to 2
}
```

## Known Issues / Mismatches
- `GET /admin` uses a projection field `article` that does not exist in the Article schema (schema uses `title` and `content`).
- `GET /edit/:id` is routed to the list handler; there is an `editArticle` controller that is not currently used by the route.
- The project includes a `Counter` model, but it is not currently used by any route.

## License
ISC
