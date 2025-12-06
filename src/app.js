const express = require("express");
const cors = require("cors");
const path = require("path");
const reminders = require("./reminders");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend automatically
app.use(express.static(path.join(__dirname, "../public")));

// HEALTH CHECK (required for CI/CD + Docker later)
app.get("/health", (req, res) => {
  res.json({ status: "healthy", environment: process.env.NODE_ENV || "dev" });
});

// ---------- CRUD API ROUTES ----------

// Get all reminders
app.get("/api/reminders", (req, res) => {
  res.json(reminders.getAll());
});

// Add reminder
app.post("/api/reminders", (req, res) => {
  const { title, date } = req.body;

  // NEW VALIDATION FIX
  if (!title || !date) {
    return res.status(400).json({ error: "title and date are required" });
  }

  const newReminder = reminders.add(title, date);
  res.json(newReminder);
});


// Edit reminder
app.put("/api/reminders/:id", (req, res) => {
  const { id } = req.params;
  const { title, date } = req.body;
  const updated = reminders.update(id, title, date);
  updated ? res.json(updated) : res.status(404).json({ error: "Not found" });
});

// Delete reminder
app.delete("/api/reminders/:id", (req, res) => {
  const { id } = req.params;
  const deleted = reminders.remove(id);
  deleted ? res.json(deleted) : res.status(404).json({ error: "Not found" });
});

module.exports = app;
