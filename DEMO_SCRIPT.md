# API Quick Reference for Demo Video

Copy & paste these commands into your terminal for the video demonstration.

## Terminal 1: Start Server
```bash
cd /Users/vamsi/Documents/kraftshala
npm run dev
```

## Terminal 2: Run Full Demo
```bash
./test-api.sh
```

---

## Manual API Calls (if you want to demo specific features)

### 1. Health Check
```bash
curl http://localhost:3000/health
```

### 2. Create User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@demo.com",
    "password": "password123"
  }'
```

### 3. Login (Get JWT Token)
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@demo.com",
    "password": "password123"
  }'
```

**Copy the token** from the response.

### 4. Create Meeting (Replace TOKEN)
```bash
curl -X POST http://localhost:3000/meetings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "userId": 1,
    "title": "Team Standup",
    "startTime": "2026-02-12T10:00:00Z",
    "endTime": "2026-02-12T11:00:00Z"
  }'
```

### 5. Try Overlapping Meeting (Should Fail)
```bash
curl -X POST http://localhost:3000/meetings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "userId": 1,
    "title": "Conflict Meeting",
    "startTime": "2026-02-12T10:30:00Z",
    "endTime": "2026-02-12T11:30:00Z"
  }'
```

Expected response:
```json
{
  "message": "Time slot already booked",
  "details": null
}
```

### 6. List Meetings with Pagination
```bash
curl -H "Authorization: Bearer TOKEN" \
  "http://localhost:3000/meetings?page=1&pageSize=10"
```

### 7. Unauthorized Access (No Token)
```bash
curl http://localhost:3000/meetings
```

Expected response:
```json
{
  "message": "Unauthorized",
  "details": null
}
```

---

## Demo Talking Points

### Key Features:
1. ✅ **Conflict Detection** - Prevents overlapping meetings
2. ✅ **JWT Authentication** - Secure token-based access
3. ✅ **Pagination** - Efficient data handling
4. ✅ **Soft Delete** - Data recovery capability
5. ✅ **Rate Limiting** - API protection
6. ✅ **Logging** - Request/error tracking
7. ✅ **Input Validation** - Data integrity

### Business Logic:
- Overlap condition: `existing.start < new.end AND existing.end > new.start`
- Returns `400 Bad Request` with clear message
- Works across all time zones using UTC timestamps

### Architecture:
- **Modular**: User & Meeting modules with clear separation
- **Layered**: DTOs → Controllers → Services → Models
- **Tested**: Unit tests included, API test script available
- **Production-ready**: Error handling, logging, validation

---

## Files to Show in Video

1. **README.md** - Full documentation
2. **Test Script** - `./test-api.sh` (runs automatically)
3. **Directory Structure** - Shows clean organization
4. **Key Files**:
   - `src/modules/meeting/service/meetingService.js` - Conflict logic
   - `src/middlewares/auth.js` - JWT validation
   - `src/config/database.js` - Sequelize config
   - Migrations - Database schema

---

## Estimated Video Length

- Setup: 30 seconds
- Run test-api.sh: 1 minute (most content)
- Code explanation: 1 minute
- Feature highlights: 30 seconds

**Total: 2-3 minutes**

---

Good luck! 🎬🚀
