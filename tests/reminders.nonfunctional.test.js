const request = require("supertest");
const app = require("../src/app");

describe("Reminder API - non-functional", () => {
  test("health endpoint responds quickly (< 200ms)", async () => {
    const start = Date.now();
    const res = await request(app).get("/health");
    const duration = Date.now() - start;

    expect(res.statusCode).toBe(200);
    expect(duration).toBeLessThan(200);
  });
});
