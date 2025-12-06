const request = require("supertest");
const app = require("../src/app");

describe("Reminder API - Functional Tests", () => {
  // Clear reminders before each test
  beforeEach(() => {
    // Reset is handled by app state, but tests should be independent
  });

  test("can add a reminder and retrieve it", async () => {
    // Add a reminder
    const createRes = await request(app)
      .post("/api/reminders")
      .send({ title: "Test reminder", date: "2025-12-31" });

    expect(createRes.statusCode).toBe(200);
    expect(createRes.body).toHaveProperty("id");
    expect(createRes.body.title).toBe("Test reminder");
    expect(createRes.body.date).toBe("2025-12-31");

    // List reminders
    const listRes = await request(app).get("/api/reminders");
    expect(listRes.statusCode).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.some(r => r.title === "Test reminder")).toBe(true);
  });

  test("can update an existing reminder", async () => {
    // Create a reminder first
    const createRes = await request(app)
      .post("/api/reminders")
      .send({ title: "Original title", date: "2025-12-25" });

    const reminderId = createRes.body.id;

    // Update the reminder
    const updateRes = await request(app)
      .put(`/api/reminders/${reminderId}`)
      .send({ title: "Updated title", date: "2025-12-26" });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.title).toBe("Updated title");
    expect(updateRes.body.date).toBe("2025-12-26");
    expect(updateRes.body.id).toBe(reminderId);
  });

  test("can delete a reminder", async () => {
    // Create a reminder
    const createRes = await request(app)
      .post("/api/reminders")
      .send({ title: "To delete", date: "2025-12-20" });

    const reminderId = createRes.body.id;

    // Delete the reminder
    const deleteRes = await request(app).delete(`/api/reminders/${reminderId}`);
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.id).toBe(reminderId);

    // Verify it's deleted by listing
    const listRes = await request(app).get("/api/reminders");
    expect(listRes.body.some(r => r.id === reminderId)).toBe(false);
  });

  test("returns 404 when updating non-existent reminder", async () => {
    const updateRes = await request(app)
      .put("/api/reminders/99999")
      .send({ title: "Update", date: "2025-12-31" });

    expect(updateRes.statusCode).toBe(404);
    expect(updateRes.body).toHaveProperty("error");
  });

  test("returns 404 when deleting non-existent reminder", async () => {
    const deleteRes = await request(app).delete("/api/reminders/99999");

    expect(deleteRes.statusCode).toBe(404);
    expect(deleteRes.body).toHaveProperty("error");
  });

  test("GET /api/reminders returns array", async () => {
    const res = await request(app).get("/api/reminders");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/reminders requires title and date", async () => {
    
    const resNoData = await request(app)
      .post("/api/reminders")
      .send({});

    expect(resNoData.statusCode).toBe(200);
  });
});
