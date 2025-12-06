const request = require("supertest");
const app = require("../src/app");

describe("Health endpoint - Smoke Tests", () => {
  test("returns 200 OK status code", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });

  test("returns healthy status in response body", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).toBe("healthy");
  });

  test("includes environment information in response", async () => {
    const res = await request(app).get("/health");
    expect(res.body).toHaveProperty("environment");
  });

  test("responds with JSON content type", async () => {
    const res = await request(app).get("/health");
    expect(res.type).toMatch(/json/);
  });

  test("health check endpoint is accessible", async () => {
    const res = await request(app).get("/health");
    expect(res.ok).toBe(true);
  });
});
