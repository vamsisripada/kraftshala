const express = require("express");
const morgan = require("morgan");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./modules/user/routes/userRoutes");
const authRoutes = require("./modules/user/routes/authRoutes");
const meetingRoutes = require("./modules/meeting/routes/meetingRoutes");

const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.json({
    message: "Meeting Scheduler API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      users: "POST /users, GET /users/:id",
      auth: "POST /auth/login",
      meetings: "GET /meetings, POST /meetings, GET /meetings/:id, PUT /meetings/:id, DELETE /meetings/:id"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/meetings", meetingRoutes);

app.use(errorHandler);

module.exports = app;
