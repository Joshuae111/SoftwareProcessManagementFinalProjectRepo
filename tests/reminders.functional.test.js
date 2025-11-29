const request = require("supertest");
const app = require("../src/app");

describe("Reminder API - functional", () => {
  test("can add and list reminders", async () => {
    // Add a reminder
    const createRes = await request(app)
      .post("/api/reminders")
      .send({ title: "Test reminder", date: "2025-12-31" });

    expect(createRes.statusCode).toBe(200);
    expect(createRes.body.title).toBe("Test reminder");

    // List reminders
    const listRes = await request(app).get("/api/reminders");
    expect(listRes.statusCode).toBe(200);

    const items = listRes.body;
    expect(Array.isArray(items)).toBe(true);
    expect(items.some(r => r.title === "Test reminder")).toBe(true);
  });
});
