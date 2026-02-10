# Meeting Scheduler Service

A production-ready backend service for scheduling meetings with automatic conflict detection. Built with Node.js, Express, and Sequelize ORM.

## Features

### Core Functionality
- **User Management**: Register and authenticate users
- **Meeting Scheduling**: Create, read, update, delete meetings
- **Conflict Detection**: Prevents overlapping time slots automatically
- **JWT Authentication**: Secure token-based API access
- **Pagination**: Efficiently handle large datasets

### Production Features
- **Error Handling**: Meaningful error messages with proper HTTP status codes
- **Logging**: Winston-based request and error logging
- **Rate Limiting**: Protect API from abuse (120 req/60s)
- **Soft Delete**: Meetings and users support paranoid mode
- **Input Validation**: Joi schema validation for all endpoints
- **Database Transactions**: Ensure data consistency

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: SQLite (development), MySQL-compatible (production)
- **Authentication**: JWT
- **Validation**: Joi
- **Logging**: Winston
- **Testing**: Jest + Supertest

## Project Structure

```
src/
├── modules/
│   ├── user/                 # User management
│   │   ├── model/            # Database schema
│   │   ├── service/          # Business logic
│   │   ├── interface/        # Controllers
│   │   ├── dto/              # Validation schemas
│   │   └── routes/           # API routes
│   └── meeting/              # Meeting scheduling
│       ├── model/            # Database schema
│       ├── service/          # Conflict detection logic
│       ├── interface/        # Controllers
│       ├── dto/              # Validation schemas
│       ├── routes/           # API routes
│       └── tests/            # Unit tests
├── middlewares/              # Auth, error handling, rate limiting
├── config/                   # Environment & database config
├── migrations/               # Database schema migrations
└── utils/                    # Helpers & utilities
```

## Quick Start

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### Database Setup

```bash
npm run db:migrate
```

### Development

```bash
npm run dev
```

Server starts on `http://localhost:3000`

### Testing

```bash
npm test
```

## API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
Most endpoints require JWT token in `Authorization` header:
```
Authorization: Bearer <token>
```

### User Endpoints

#### Create User
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-02-10T16:53:00.662Z",
  "updatedAt": "2026-02-10T16:53:00.662Z"
}
```

#### Get User
```http
GET /users/:id
```

### Authentication

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Meeting Endpoints

#### Create Meeting
```http
POST /meetings
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": 1,
  "title": "Team Standup",
  "startTime": "2026-02-12T10:00:00Z",
  "endTime": "2026-02-12T11:00:00Z"
}
```

**Business Rule**: If time overlaps with existing meeting, returns 400:
```json
{
  "message": "Time slot already booked",
  "details": null
}
```

Overlap detection logic:
```javascript
existing.startTime < new.endTime AND existing.endTime > new.startTime
```

#### List Meetings
```http
GET /meetings?page=1&pageSize=20&userId=1
Authorization: Bearer <token>
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "title": "Team Standup",
      "startTime": "2026-02-12T10:00:00.000Z",
      "endTime": "2026-02-12T11:00:00.000Z",
      "createdAt": "2026-02-10T16:53:11.659Z",
      "updatedAt": "2026-02-10T16:53:11.659Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 1
  }
}
```

#### Get Meeting
```http
GET /meetings/:id
Authorization: Bearer <token>
```

#### Update Meeting
```http
PUT /meetings/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "startTime": "2026-02-12T14:00:00Z",
  "endTime": "2026-02-12T15:00:00Z"
}
```

#### Delete Meeting
```http
DELETE /meetings/:id
Authorization: Bearer <token>
```

Returns 204 No Content on success.

## Error Handling

All errors return consistent format:

```json
{
  "message": "Descriptive error message",
  "details": null
}
```

### Status Codes
- `200` - Success
- `201` - Created
- `204` - No Content (success, no body)
- `400` - Bad Request (validation or business rule violation)
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Server Error

## Database Design

### Users Table
- `id` (PRIMARY KEY)
- `name` (VARCHAR 120)
- `email` (VARCHAR 160, UNIQUE)
- `passwordHash` (VARCHAR 120, bcrypt hashed)
- `createdAt`, `updatedAt`, `deletedAt` (soft delete)

### Meetings Table
- `id` (PRIMARY KEY)
- `userId` (FOREIGN KEY → users.id)
- `title` (VARCHAR 180)
- `startTime` (DATETIME)
- `endTime` (DATETIME)
- `createdAt`, `updatedAt`, `deletedAt` (soft delete)

**Indexes** for performance:
- `(userId, startTime)` - for conflict detection queries
- `(userId, endTime)` - for range queries

## Testing

Run the comprehensive test suite:

```bash
./test-api.sh
```

This script demonstrates:
1. User creation
2. Authentication (JWT)
3. Meeting creation
4. Conflict detection (overlap prevention)
5. Pagination
6. Meeting updates
7. Authorization checks
8. Error handling

## Configuration

### Environment Variables

```env
PORT=3000
NODE_ENV=development
DB_DIALECT=sqlite
DB_NAME=database.sqlite
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=120
LOG_LEVEL=info
```

## Performance Considerations

1. **Database Indexes**: Queries for conflict detection are indexed on `(userId, startTime)` and `(userId, endTime)`
2. **Pagination**: Default 20 items per page, max 100 items
3. **Rate Limiting**: 120 requests per 60 seconds per IP
4. **Soft Delete**: Deleted records remain in DB (recoverable)
5. **Connection Pooling**: Sequelize manages connection pool

## Security

- **Password Hashing**: Bcrypt with 10 salt rounds
- **JWT Tokens**: HS256 algorithm, 1 day expiry
- **Input Validation**: All inputs validated with Joi
- **Rate Limiting**: Protects endpoints from abuse
- **Soft Delete**: No permanent data loss

## Development Tips

### View Logs
Logs are printed to console in development:
```
{"level":"info","message":"Server running on port 3000","timestamp":"..."}
```

### Database Inspection
SQLite database file: `database.sqlite`

View with any SQLite client or:
```bash
sqlite3 database.sqlite ".tables"
```

### Adding New Features

1. Create model in `src/modules/[feature]/model/`
2. Create service in `src/modules/[feature]/service/`
3. Create controller in `src/modules/[feature]/interface/`
4. Create DTO validation in `src/modules/[feature]/dto/`
5. Create routes in `src/modules/[feature]/routes/`
6. Create migration: `npm run sequelize-cli migration:generate -- --name feature-name`

## Troubleshooting

### "Cannot GET /"
The root endpoint returns API documentation. This is expected.

### "Table does not exist"
Run migrations: `npm run db:migrate`

### "Unauthorized" accessing meetings
Pass JWT token: `Authorization: Bearer <token>`

### Port 3000 already in use
Change `PORT` in `.env` or kill existing process:
```bash
lsof -i :3000
kill -9 <PID>
```

## License

MIT - See LICENSE file for details

## Support

For issues or questions, review code comments and test-api.sh examples.

