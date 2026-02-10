# How to Use Postman with Your API

## Step 1: Import Collection into Postman

1. Open **Postman** (download from https://www.postman.com/downloads/ if you don't have it)
2. Click **Import** (top left corner)
3. Click **Upload Files**
4. Select: `Kraftshala_Meeting_Scheduler.postman_collection.json`
5. Click **Import**

You'll see all 12 endpoints ready to use! ✅

---

## Step 2: Make Sure Server is Running

In your terminal:
```bash
cd /Users/vamsi/Documents/kraftshala
npm run dev
```

Server should start on **http://localhost:3000**

---

## Step 3: Test the API (Follow This Order)

### 1️⃣ Health Check
- Select: **Health Check**
- Click **Send**
- Should return: `{"status":"ok"}`

### 2️⃣ Create User
- Select: **Create User**
- Body is already filled in
- Click **Send**
- Copy the `id` from response (you'll need it later)

### 3️⃣ Login
- Select: **Login**
- Click **Send**
- **IMPORTANT**: Copy the `token` from the response
- You'll need this for all meeting endpoints!

### 4️⃣ Update Authorization Token
For all meeting requests:
1. Go to **Headers** tab
2. Find `Authorization` header
3. Replace `YOUR_TOKEN_HERE` with your actual token from Login
4. Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 5️⃣ Create Meeting
- Select: **Create Meeting**
- Make sure `Authorization` header has your token
- Update `userId` in body to match your user ID
- Click **Send**
- Meeting created! ✅

### 6️⃣ Test Conflict Detection
- Select: **Create Overlapping Meeting (Should Fail)**
- Make sure `Authorization` header has your token
- Update `userId` in body
- Click **Send**
- Should return: `{"message":"Time slot already booked"}` ✅

### 7️⃣ List All Meetings
- Select: **List Meetings**
- Make sure token is set
- Click **Send**
- See all meetings with pagination!

### 8️⃣ Other Endpoints
Try these in any order:
- **Get Meeting** - Retrieve single meeting
- **Update Meeting** - Change meeting details
- **Delete Meeting** - Soft delete a meeting
- **Test Unauthorized Access** - Shows auth protection

---

## Quick Tips

### Setting Token for All Requests
Instead of updating each request manually:

1. Click on **Kraftshala Meeting Scheduler** collection name
2. Go to **Variables** tab
3. Add variable:
   - Name: `token`
   - Value: paste your JWT token
4. In each request, use `{{token}}` instead of `YOUR_TOKEN_HERE`

### Common Issues

**"Unauthorized" error**
→ Make sure you copied the token correctly and included "Bearer " prefix

**"Email already in use"**
→ Change the email in Create User request

**"User not found"**
→ Make sure you're using the correct userId from Create User response

**"Cannot connect"**
→ Make sure server is running (`npm run dev`)

---

## Expected Results

✅ Health Check → Status OK
✅ Create User → New user with ID
✅ Login → JWT token received
✅ Create Meeting → Meeting created
✅ Overlapping Meeting → Rejected with error
✅ List Meetings → Shows all meetings with pagination
✅ Get/Update/Delete → All work correctly
✅ Unauthorized Access → Properly rejected

---

## For Demo Video

Record your screen while testing in Postman:
1. Show Health Check
2. Create User
3. Login and copy token
4. Create Meeting
5. Try overlapping meeting (see it fail)
6. List meetings
7. Show unauthorized access

This makes a professional demo! 🎥

---

Need help? All requests are pre-configured. Just:
1. Import collection
2. Start server
3. Follow the numbered steps above
4. Update token after login

Enjoy testing! 🚀
