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

### Quick Start (Local)

1. Clone the repository:

   git clone https://github.com/Joshuae111/SoftwareProcessManagementFinalProjectRepo.git
   cd SoftwareProcessManagementFinalProjectRepo

2. Install dependencies:

   npm ci

3. Start the app:

   npm start

4. Open in your browser:

   http://localhost:4000

---

### Getting Started (Docker)

1. Clone the repository:

   git clone https://github.com/Joshuae111/SoftwareProcessManagementFinalProjectRepo.git
   cd SoftwareProcessManagementFinalProjectRepo

2. Build and run containers:

   docker compose build
   docker compose up -d

3. Access the app:

   - **Staging:** http://localhost:5000
   - **Production:** http://localhost:7000

4. Stop containers:

   docker compose down

---

## 3. How to Run the App

### Local Development

Start the server:

   npm start

The app listens on **port 4000**.

Open your browser:

   http://localhost:4000

You should see the Reminder Studio UI.

### Docker (Staging & Production)

See the **Getting Started (Docker)** section above.

Both staging and production containers run the same app but on different ports for demonstration purposes.

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

### Locally

Run all tests:

   npm test

This executes tests in the `tests/` folder using Jest and Supertest.

**Test files:**
- `tests/health.test.js` – 5 smoke tests for the /health endpoint
- `tests/reminders.functional.test.js` – 7 functional tests for CRUD operations
- `tests/reminders.nonfunctional.test.js` – 6 performance tests

**Expected output:**
```
Test Suites: 3 passed, 3 total
Tests:       18 passed, 18 total
```

### In Docker

To run tests in a container, you can build a test image or run:

   docker compose run --rm staging npm test

### CI/CD Pipeline

Tests automatically run on:
- Every push to any branch (via `.github/workflows/ci.yml`)
- Every pull request (via `.github/workflows/ci.yml`)
- Merges to staging (via `.github/workflows/staging-deploy.yml`)
- Merges to main/production (via `.github/workflows/production-deploy.yml`)

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

## 8. CI/CD & Deployment

### GitHub Actions Workflows

This repository includes three automated CI/CD workflows:

**`.github/workflows/ci.yml`**
- Runs on every push and pull request
- Tests on Node.js 18.x and 20.x
- Executes all 18 tests
- Provides test coverage reports

**`.github/workflows/staging-deploy.yml`**
- Runs on push to `staging` branch
- Installs dependencies
- Runs full test suite
- Optionally builds Docker image

**`.github/workflows/production-deploy.yml`**
- Runs on push to `main` branch
- Full test validation
- Health endpoint verification
- Docker image build and tagging

### Docker Deployment

The `Dockerfile` and `docker-compose.yml` are configured for:
- **Staging:** Port 5000 (NODE_ENV=staging)
- **Production:** Port 7000 (NODE_ENV=production)

Both images include health checks that call the `/health` endpoint.

---

## 9. Project Structure

   /public
     index.html        -> Frontend UI
     style.css         -> Styling
     script.js         -> Frontend logic (calls API)

   /src
     app.js            -> Express app (routes, middleware)
     reminders.js      -> In-memory reminder store
     server.js         -> Server startup (npm start entry point)

   /tests
     health.test.js                      -> 5 smoke tests
     reminders.functional.test.js        -> 7 functional tests
     reminders.nonfunctional.test.js     -> 6 performance tests

   /.github/workflows
     ci.yml                      -> Run tests on push/PR
     staging-deploy.yml          -> Deploy to staging
     production-deploy.yml       -> Deploy to production

   /docs
     (Project documentation, governance, screenshots)

   Dockerfile                  -> Container image definition
   docker-compose.yml          -> Multi-container setup
   CODE_REVIEW_TEMPLATE.md     -> Code review checklist
   package.json                -> Dependencies and scripts

---

## 10. Contributing

When contributing to this project:

1. Create a feature branch from `staging`:
   ```
   git checkout staging
   git pull origin staging
   git checkout -b feature/<your-task>
   ```

2. Make changes and test locally:
   ```
   npm test
   ```

3. Commit with clear messages:
   ```
   git add .
   git commit -m "Describe your changes"
   ```

4. Push and create a pull request:
   ```
   git push -u origin feature/<your-task>
   ```

5. Request review using `CODE_REVIEW_TEMPLATE.md`

6. After approval, merge into `staging`

---

## 11. Troubleshooting

**Port already in use?**
- Change the PORT environment variable or kill the process using port 4000

**Tests failing locally?**
- Ensure Node.js 18+ is installed: `node --version`
- Run `npm ci` to clean-install dependencies
- Check that no other instance is running on port 4000

**Docker issues?**
- Ensure Docker and Docker Compose are installed
- Run `docker compose down` to stop containers
- Run `docker system prune` to clean up unused images/containers
