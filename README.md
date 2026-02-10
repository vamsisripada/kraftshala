# Meeting Scheduler Service

Backend service to create users and schedule meetings without overlapping time slots.

## Tech Stack
- Node.js, Express
- Sequelize ORM
- MySQL (development)

## Setup
1. Copy environment file:
   ```bash
   cp .env.example .env
   ```
2. Update `.env` with your database credentials.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run migrations:
   ```bash
   npm run db:migrate
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## API Overview
### Users
- `POST /users` Create user
- `GET /users/:id` Get user

### Auth (optional)
- `POST /auth/login` Get JWT token

### Meetings
- `POST /meetings` Create meeting
- `GET /meetings` List meetings (filters: `userId`, `startDate`, `endDate`, pagination: `page`, `pageSize`)
- `GET /meetings/:id` Get meeting
- `PUT /meetings/:id` Update meeting
- `DELETE /meetings/:id` Delete meeting

## Business Rules
- No time conflicts allowed:
  - `existing.startTime < new.endTime` AND `existing.endTime > new.startTime`
- `startTime` must be before `endTime`

## Tests
Tests run with SQLite in-memory.
```bash
npm test
```
