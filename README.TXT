Reminder Studio — Full Stack Reminder App (Node.js + Express + Docker + CI/CD)

Reminder Studio is a lightweight, containerized web application for managing reminders.
It includes a frontend UI, a backend API, and complete CI/CD automation using GitHub Actions.

The project demonstrates modern software engineering practices including automated testing, branching workflows, and multi-environment deployment (staging + production).

📌 Features

Create, view, update, and delete reminders

Clean, responsive UI served directly by Express

Status badges (On Track, Due Soon, Past Due)

Fully tested backend (18 automated tests)

Staging & Production environments using Docker Compose

CI/CD pipelines for testing and automated builds

Health check endpoint for monitoring & deployment

Consistent governance: issue templates + code review templates

📁 Project Structure
REMINDER-APP/
│
├── .github/workflows/
│   ├── ci.yml
│   ├── staging-deploy.yml
│   └── production-deploy.yml
│
├── docs/
│   ├── CODE_REVIEW_TEMPLATE.md
│   └── ISSUE_TEMPLATE.md
│
├── public/                 # Static frontend
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── src/
│   ├── app.js              # Express app (routes + middleware)
│   ├── reminders.js        # In-memory data store
│   └── server.js           # Starts local development server
│
├── tests/                  # Jest + Supertest automated tests
│   ├── health.test.js
│   ├── reminders.functional.test.js
│   └── reminders.nonfunctional.test.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md

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
🚀 Quick Start (Local Development)
1. Install prerequisites

Node.js 18 or 20

npm

### Local Development

Start the server:
(Optional) Docker Desktop

2. Clone the repository
git clone https://github.com/Joshuae111/SoftwareProcessManagementFinalProjectRepo.git
cd SoftwareProcessManagementFinalProjectRepo

The app listens on **port 4000**.

Open your browser:
3. Install dependencies
npm install

4. Start the server (local mode)
npm start


You should see the Reminder Studio UI.

### Docker (Staging & Production)

See the **Getting Started (Docker)** section above.

Both staging and production containers run the same app but on different ports for demonstration purposes.
Local development runs on:

👉 http://localhost:4000

Check backend health:

👉 http://localhost:4000/health

🧪 Running Tests

The project includes:

✔ Smoke tests
✔ Functional CRUD tests
✔ Non-functional performance tests
✔ Validation tests

Run all tests:

npm test


All 19 tests must pass.

📦 Docker Deployment

The project includes two Docker environments:

Environment	Port	Purpose
Staging	5000	Pre-production testing
Production	7000	Final environment
Start both environments
docker compose up --build

Staging environment

👉 http://localhost:5000

👉 http://localhost:5000/health

Production environment

👉 http://localhost:7000

👉 http://localhost:7000/health

### Locally

Run all tests:
Stop containers
docker compose down

🌐 API Reference

All endpoints return JSON.

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
GET /api/reminders

Retrieve all reminders.

Response:

[
  { "id": 1, "title": "Test", "date": "2025-01-01" }
]

POST /api/reminders

Create a new reminder.

Body:

{ "title": "Buy milk", "date": "2025-01-01" }


Validation:

Title required

Date required

Empty body rejected

PUT /api/reminders/:id

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
Update a reminder.

DELETE /api/reminders/:id

Delete a reminder.

❤️ Health Check

Used by CI/CD + Docker:

GET /health

{
  "status": "healthy",
  "environment": "dev"
}


For staging/production, environment will change based on NODE_ENV.

🔧 CI/CD Pipeline Overview

GitHub Actions automates:

✔ Test execution
✔ Environment validation
✔ Docker image builds
✔ Staging deployment
✔ Production deployment

Workflows found in:

.github/workflows/
│   ci.yml
│   staging-deploy.yml
│   production-deploy.yml

CI Pipeline:

Triggers on:

Push to main

Push to staging

Push to feature/*

Pull requests

Runs:

npm ci

npm test

Coverage tests

Health check

📜 Governance & Contribution Workflow

The repo includes standard governance artifacts:

✔ Issue Template

Located under /docs/ISSUE_TEMPLATE.md
Used for reporting bugs/changes.

✔ Code Review Template

Located under /docs/CODE_REVIEW_TEMPLATE.md
Must be completed before merging.

🔀 Branching & Workflow Model

Team workflow:

Create an Issue

Create a branch:
feature/issue-number-description

Make changes & commit

Push → Open a Pull Request into staging

Teammate performs code review

Approve & merge

CI runs tests

Merge staging → main when stable

Close the issue

This ensures a clean traceable workflow.

🧭 Environment Summary
Mode	How to Start	URL
Local Dev	npm start	http://localhost:4000

Staging (Docker)	docker compose up	http://localhost:5000

Production (Docker)	docker compose up	http://localhost:7000
