const request = require("supertest");
const app = require("../../../app");
const { sequelize, User, Meeting } = require("../../../config/database");

const createUserViaApi = async () => {
  const email = `user${Date.now()}@test.com`;
  const password = "password123";

  const res = await request(app).post("/users").send({
    name: "Test User",
    email,
    password
  });

  return { userId: res.body.id, email, password };
};

const loginAndGetToken = async (email, password) => {
  const res = await request(app)
    .post("/auth/login")
    .send({ email, password });

  return res.body.token;
};

describe("Meeting conflicts", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await Meeting.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("rejects overlapping meetings", async () => {
    const { userId, email, password } = await createUserViaApi();
    const token = await loginAndGetToken(email, password);

    await request(app)
      .post("/meetings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId,
        title: "Existing",
        startTime: "2025-01-01T10:00:00.000Z",
        endTime: "2025-01-01T11:00:00.000Z"
      })
      .expect(201);

    const conflictRes = await request(app)
      .post("/meetings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId,
        title: "Overlap",
        startTime: "2025-01-01T10:30:00.000Z",
        endTime: "2025-01-01T11:30:00.000Z"
      });

    expect(conflictRes.status).toBe(400);
    expect(conflictRes.body.message).toBe("Time slot already booked");
  });
});
