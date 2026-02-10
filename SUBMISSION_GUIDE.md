# Submission Guide for Kraftshala

This guide will help you submit your Meeting Scheduler project to Kraftshala.

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new public repository named `kraftshala-meetings`
3. **Do NOT initialize with README** (we already have one)
4. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/kraftshala-meetings.git`)

## Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
cd /Users/vamsi/Documents/kraftshala

# Rename branch to 'main' (optional but recommended)
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/kraftshala-meetings.git

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Verify on GitHub

Visit `https://github.com/YOUR_USERNAME/kraftshala-meetings` and confirm all files are there.

## Step 4: Record Demo Video

Record a video (2-5 minutes) demonstrating:

### What to Show:

**1. Project Setup (15 seconds)**
```bash
npm install
npm run db:migrate
npm run dev
```

**2. API Endpoints Working (2 minutes)**
Run the test script:
```bash
./test-api.sh
```

Show these specific scenarios:
- ✅ Create user
- ✅ Login with JWT
- ✅ Create meeting
- ✅ Try overlapping meeting (gets rejected with "Time slot already booked")
- ✅ List meetings with pagination
- ✅ Update meeting
- ✅ Unauthorized access attempt

**3. Code Structure (30 seconds)**
Show the directory structure:
```
src/
  ├── modules/
  │   ├── user/ (model, service, controller, dto, routes)
  │   ├── meeting/ (model, service, controller, dto, routes, tests)
  ├── middlewares/ (auth, errorHandler, rateLimiter)
  ├── config/ (database, env, sequelize-cli)
  ├── migrations/ (database schema)
  └── utils/ (logger, asyncHandler, pagination, errors)
```

**4. README & Documentation (15 seconds)**
- Show README.md content
- Mention features: JWT auth, pagination, logging, rate limiting, soft delete

### Recording Options:

Use any of these:
1. **QuickTime** (Mac built-in): Press Cmd+Space → "QuickTime Player" → File → New Screen Recording
2. **OBS Studio** (free): https://obsproject.com
3. **Loom** (easy, free): https://loom.com
4. **ScreenFlow** (Mac, paid but excellent)

### Upload Video:

Upload to one of these:
- **YouTube** (public, unlisted, or private)
- **Google Drive** (make sure it's shareable)
- **Vimeo** (free tier available)
- **Any other video hosting**

Keep the link handy for submission.

## Step 5: Prepare for Submission

Gather these links:

1. **GitHub Repository**: `https://github.com/YOUR_USERNAME/kraftshala-meetings`
2. **Demo Video**: Your video link

## Step 6: Submit to Kraftshala

1. Visit the Kraftshala form/portal
2. Fill in:
   - Assignment: **Intern, Backend Developer**
   - GitHub Repository Link
   - Demo Video Link
3. Submit!

---

## Checklist Before Submission

- [ ] Code committed and pushed to GitHub
- [ ] Repository is public
- [ ] README.md is visible on GitHub
- [ ] Demo video recorded showing all features
- [ ] Video link is shareable
- [ ] GitHub and video links are correct
- [ ] All tests in `./test-api.sh` pass
- [ ] Server starts with `npm run dev`

---

## Quick Testing Commands

Before recording, verify everything works:

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Run tests
./test-api.sh

# Individual tests:
curl http://localhost:3000/                              # API info
curl http://localhost:3000/health                        # Health check
```

---

**Questions?** Check README.md or review the test-api.sh script for examples.

Good luck with your submission! 🚀
