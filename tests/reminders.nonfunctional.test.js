const request = require("supertest");
const app = require("../src/app");

describe("Reminder API - Non-Functional Tests", () => {
  test("health endpoint responds quickly (< 200ms)", async () => {
    const start = Date.now();
    const res = await request(app).get("/health");
    const duration = Date.now() - start;

    expect(res.statusCode).toBe(200);
    expect(duration).toBeLessThan(200);
  });

  test("GET /api/reminders responds quickly (< 300ms)", async () => {
    const start = Date.now();
    const res = await request(app).get("/api/reminders");
    const duration = Date.now() - start;

    expect(res.statusCode).toBe(200);
    expect(duration).toBeLessThan(300);
  });

  test("POST /api/reminders responds within acceptable time (< 300ms)", async () => {
    const start = Date.now();
    const res = await request(app)
      .post("/api/reminders")
      .send({ title: "Perf test", date: "2025-12-31" });
    const duration = Date.now() - start;

    expect(res.statusCode).toBe(200);
    expect(duration).toBeLessThan(300);
  });

  test("API can handle multiple concurrent requests efficiently", async () => {
    const start = Date.now();
    
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(
        request(app).get("/api/reminders")
      );
    }

    const results = await Promise.all(requests);
    const duration = Date.now() - start;

    results.forEach(res => {
      expect(res.statusCode).toBe(200);
    });
    // All 10 requests should complete in reasonable time
    expect(duration).toBeLessThan(1000);
  });

  test("PUT /api/reminders/:id responds quickly (< 300ms)", async () => {
    // Create a reminder first
    const createRes = await request(app)
      .post("/api/reminders")
      .send({ title: "Perf update test", date: "2025-12-31" });
    const reminderId = createRes.body.id;

    // Measure update performance
    const start = Date.now();
    const res = await request(app)
      .put(`/api/reminders/${reminderId}`)
      .send({ title: "Updated", date: "2025-12-30" });
    const duration = Date.now() - start;

    expect(res.statusCode).toBe(200);
    expect(duration).toBeLessThan(300);
  });

  test("DELETE /api/reminders/:id responds quickly (< 300ms)", async () => {
    // Create a reminder first
    const createRes = await request(app)
      .post("/api/reminders")
      .send({ title: "Perf delete test", date: "2025-12-31" });
    const reminderId = createRes.body.id;

    // Measure delete performance
    const start = Date.now();
    const res = await request(app).delete(`/api/reminders/${reminderId}`);
    const duration = Date.now() - start;

    expect(res.statusCode).toBe(200);
    expect(duration).toBeLessThan(300);
  });
});
