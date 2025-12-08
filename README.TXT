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

🚀 Quick Start (Local Development)
1. Install prerequisites

Node.js 18 or 20

npm

(Optional) Docker Desktop

2. Clone the repository
git clone https://github.com/Joshuae111/SoftwareProcessManagementFinalProjectRepo.git
cd SoftwareProcessManagementFinalProjectRepo

3. Install dependencies
npm install

4. Start the server (local mode)
npm start


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

Stop containers
docker compose down

🌐 API Reference

All endpoints return JSON.

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
