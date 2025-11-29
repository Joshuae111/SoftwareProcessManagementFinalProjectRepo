# Reminder Studio (Node.js + Express)

A simple reminder / to-do web app used to demonstrate CI/CD, automated testing, and
Docker deployment for SYST 38634 – Software Process Management.

The app lets you:
- Add reminders with a title and date
- Edit existing reminders
- Delete reminders
- See status badges like "On track", "Due soon", and "Past due"
- Check a /health endpoint used by Docker and CI/CD

Everything runs on a single Node.js + Express server, with a clean frontend served from
the same port.

---

## 1. Requirements

- Node.js (LTS recommended, e.g. 18+)
- npm

No database or external services are required. All reminders are stored in-memory.

---

## 2. Getting Started

1. Clone the repository:

   git clone https://github.com/Joshuae111/SoftwareProcessManagementFinalProjectRepo.git
   cd SoftwareProcessManagementFinalProjectRepo

2. Install dependencies:

   npm install

---

## 3. How to Run the App

Start the server:

   npm start

By default the app listens on port 4000.

Open the app in your browser:

   http://localhost:4000

You should see the Reminder Studio UI, where you can add/edit/delete reminders.

---

## 4. Health Check Endpoint

The application exposes a health check endpoint used by Docker and CI/CD:

   GET /health

Example in browser:

   http://localhost:4000/health

Expected response (JSON):

   {
     "status": "healthy",
     "environment": "dev"
   }

The UI also has a "Check health" button in the top bar that calls this endpoint and
shows the status.

---

## 5. API Endpoints (Backend)

All API routes return JSON.

- GET /api/reminders  
  Returns an array of all reminders.

- POST /api/reminders  
  Body: { "title": string, "date": "YYYY-MM-DD" }  
  Creates a new reminder and returns it.

- PUT /api/reminders/:id  
  Body: { "title": string, "date": "YYYY-MM-DD" }  
  Updates an existing reminder.

- DELETE /api/reminders/:id  
  Deletes the reminder with the given id.

Data is stored in memory only (no persistent database).

---

## 6. Running Tests

The project uses Jest + Supertest for automated tests.

To run all tests:

   npm test

This will execute tests under the `tests/` folder, including:

- tests/health.test.js  
  Verifies that `/health` returns status 200 and a "healthy" payload.

- tests/reminders.functional.test.js  
  Functional test that creates a reminder and then confirms it appears in the list.

- tests/reminders.nonfunctional.test.js  
  Simple non-functional test that checks the `/health` endpoint responds within a
  short time window.

These tests are used both locally and later in the CI pipeline.

---

## 7. Project Structure

High-level layout:

   /public
     index.html        -> Frontend UI
     style.css         -> Styling for the app
     script.js         -> Frontend logic, calls the API

   /src
     app.js            -> Express app (routes, middleware, health check)
     reminders.js      -> In-memory reminder store
     server.js         -> Starts the Express server (npm start entry point)

   /tests
     health.test.js
     reminders.functional.test.js
     reminders.nonfunctional.test.js

   /docs
     (Project documentation, governance templates, screenshots, etc. will go here)

   /.github/workflows
     (GitHub Actions CI/CD workflows will be added here later)

---

## 8. Next Steps for the CI/CD Project

This repository will be extended to include:

- Dockerfile and docker-compose.yml with staging (port 5000) and production (port 6000)
- GitHub Actions workflows for:
  - CI (run tests on each push)
  - Staging deployment
  - Production deployment
- Additional automated tests:
  - More functional tests
  - More non-functional and smoke tests
- Governance templates:
  - CODE_REVIEW_TEMPLATE.md
  - ISSUE_TEMPLATE.md
- Software Development Plan document in /docs with required screenshots

For now, the app is fully usable locally and ready to be containerized and wired into CI/CD.
