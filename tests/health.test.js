const request = require("supertest");
const app = require("../src/app");

describe("Health endpoint", () => {
  test("returns 200 and healthy status", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("healthy");
  });
});
