# CODE REVIEW TEMPLATE

**PR Title / Link:**  
**Branch:**  
**Author:**  
**Reviewer:**  
**Date:**

---

## 1. Overview

**Summary of changes being reviewed (1–3 sentences):**

- 

**Area(s) of the system touched:**

- [ ] API / backend logic
- [ ] Tests (unit/functional/non-functional)
- [ ] Docker / docker-compose
- [ ] GitHub Actions workflows
- [ ] Front-end / UI (if applicable)
- [ ] Documentation / README

---

## 2. Testing Performed by Author

Reviewer: verify the author has done at least these.

- [ ] `npm test` passes locally
- [ ] All 18 Jest tests passing
- [ ] GitHub Actions CI shows a ✅ green run for this branch
- [ ] Docker build works: `docker compose build`
- [ ] Staging runs: `docker compose up staging -d` and `http://localhost:5000/health` returns 200
- [ ] Production runs (optional): `docker compose up production -d` and `http://localhost:7000/health` returns 200

Notes / evidence (links to screenshots, logs, etc.):

- 

---

## 3. Code Quality Review

**3.1 Readability & Style**

- [ ] Variable / function names are clear and meaningful
- [ ] Code is formatted consistently
- [ ] Comments are helpful (no commented-out dead code unless justified)

Notes:

- 

**3.2 Correctness & Logic**

- [ ] Logic matches the feature / bug description
- [ ] Edge cases are considered (invalid data, missing fields, etc.)
- [ ] Error handling is appropriate (status codes, messages, etc.)

Notes:

- 

**3.3 Tests**

- [ ] New features have tests
- [ ] Existing tests updated if behaviour changed
- [ ] Tests cover both “happy path” and “error” scenarios
- [ ] Non-functional / performance expectations respected (e.g., <300ms)

Notes:

- 

**3.4 CI/CD & Deployment Impact**

- [ ] Workflows (`.github/workflows/*.yml`) still make sense
- [ ] Dockerfile / docker-compose still build and start successfully
- [ ] Environment variables (e.g., `NODE_ENV`, ports) are correct

Notes:

- 

---

## 4. Issues Found

List any bugs or concerns that MUST be fixed before merge:

1. 
2. 

---

## 5. Suggestions / Nice-to-Have Improvements

These are not blockers, but would improve the code:

- 

---

## 6. Reviewer Recommendation

- [ ] **Approve** – OK to merge into staging
- [ ] **Approve with small changes** – OK once minor comments are addressed
- [ ] **Request changes** – Needs more work before merge

**Final comment to author:**

> 
