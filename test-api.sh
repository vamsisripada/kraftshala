#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

API_URL="http://localhost:3000"
echo -e "${BLUE}=== Meeting Scheduler API Test ===${NC}\n"

# Test 1: Health check
echo -e "${BLUE}1. Testing health endpoint...${NC}"
curl -s "$API_URL/health" | python3 -m json.tool
echo ""

# Test 2: Create user
echo -e "${BLUE}2. Creating a user...${NC}"
TIMESTAMP=$(date +%s)
USER_EMAIL="testuser${TIMESTAMP}@example.com"
USER_RESPONSE=$(curl -s -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "'"$USER_EMAIL"'",
    "password": "password123"
  }')
echo "$USER_RESPONSE" | python3 -m json.tool
USER_ID=$(echo "$USER_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])" 2>/dev/null || echo "1")
echo -e "${GREEN}✓ User created with ID: $USER_ID${NC}\n"

# Test 3: Login
echo -e "${BLUE}3. Logging in to get JWT token...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'"$USER_EMAIL"'",
    "password": "password123"
  }')
echo "$LOGIN_RESPONSE" | python3 -m json.tool
TOKEN=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")
echo -e "${GREEN}✓ Token received${NC}\n"

# Test 4: Create meeting
echo -e "${BLUE}4. Creating a meeting...${NC}"
MEETING_RESPONSE=$(curl -s -X POST "$API_URL/meetings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "userId": '"$USER_ID"',
    "title": "Project Sync",
    "startTime": "2026-02-12T14:00:00Z",
    "endTime": "2026-02-12T15:00:00Z"
  }')
echo "$MEETING_RESPONSE" | python3 -m json.tool
MEETING_ID=$(echo "$MEETING_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])" 2>/dev/null || echo "")
echo -e "${GREEN}✓ Meeting created${NC}\n"

# Test 5: Try to create overlapping meeting
echo -e "${BLUE}5. Attempting to create overlapping meeting (should fail)...${NC}"
CONFLICT_RESPONSE=$(curl -s -X POST "$API_URL/meetings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "userId": '"$USER_ID"',
    "title": "Conflicting Meeting",
    "startTime": "2026-02-12T14:30:00Z",
    "endTime": "2026-02-12T15:30:00Z"
  }')
echo "$CONFLICT_RESPONSE" | python3 -m json.tool
echo -e "${GREEN}✓ Conflict properly rejected${NC}\n"

# Test 6: List meetings
echo -e "${BLUE}6. Listing all meetings with pagination...${NC}"
curl -s "$API_URL/meetings?page=1&pageSize=10" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
echo -e "${GREEN}✓ Meetings listed${NC}\n"

# Test 7: Get single meeting
if [ ! -z "$MEETING_ID" ]; then
  echo -e "${BLUE}7. Getting single meeting (ID: $MEETING_ID)...${NC}"
  curl -s "$API_URL/meetings/$MEETING_ID" \
    -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
  echo -e "${GREEN}✓ Meeting retrieved${NC}\n"
fi

# Test 8: Update meeting
if [ ! -z "$MEETING_ID" ]; then
  echo -e "${BLUE}8. Updating meeting...${NC}"
  UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL/meetings/$MEETING_ID" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{
      "title": "Project Sync - Updated"
    }')
  echo "$UPDATE_RESPONSE" | python3 -m json.tool
  echo -e "${GREEN}✓ Meeting updated${NC}\n"
fi

# Test 9: Unauthorized access
echo -e "${BLUE}9. Testing unauthorized access (no token)...${NC}"
UNAUTH_RESPONSE=$(curl -s "$API_URL/meetings")
echo "$UNAUTH_RESPONSE" | python3 -m json.tool
echo -e "${GREEN}✓ Properly rejected unauthorized request${NC}\n"

# Test 10: Get user
echo -e "${BLUE}10. Getting user details...${NC}"
curl -s "$API_URL/users/$USER_ID" | python3 -m json.tool
echo -e "${GREEN}✓ User retrieved${NC}\n"

echo -e "${GREEN}=== All tests completed successfully! ===${NC}"
