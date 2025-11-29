const API = "/api/reminders";

const elements = {
  list: document.getElementById("list"),
  form: document.getElementById("reminder-form"),
  title: document.getElementById("title"),
  date: document.getElementById("date"),
  feedback: document.getElementById("feedback"),
  submit: document.getElementById("submit-btn"),
  cancel: document.getElementById("cancel-edit"),
  countChip: document.getElementById("count-chip"),
  emptyState: document.getElementById("empty-state"),
  editingLabel: document.getElementById("editing-label"),
  apiStatus: document.getElementById("api-status"),
  healthButton: document.getElementById("health-button"),
};

let reminders = [];
let editingId = null;

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No date";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getStatus(value) {
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(date.getTime())) {
    return { label: "Scheduled", tone: "ready" };
  }

  const diff = date.getTime() - today.getTime();
  const day = 24 * 60 * 60 * 1000;

  if (diff < 0) return { label: "Past due", tone: "past" };
  if (diff <= day * 2) return { label: "Due soon", tone: "soon" };
  return { label: "On track", tone: "ready" };
}

function setFeedback(message, tone = "") {
  if (!elements.feedback) return;
  elements.feedback.textContent = message;
  elements.feedback.className = "feedback" + (tone ? ` ${tone}` : "");
}

function updateApiStatus(message, tone = "ready") {
  if (!elements.apiStatus) return;
  elements.apiStatus.textContent = message;
  elements.apiStatus.className = `status-pill ${tone}`;
}

async function checkHealth() {
  updateApiStatus("Local API: checking...", "checking");
  try {
    const res = await fetch("/health");
    if (!res.ok) throw new Error("Health failed");
    const body = await res.json();
    const env = body.environment || "dev";
    updateApiStatus(`Local API: healthy (${env})`, "ready");
  } catch (error) {
    updateApiStatus("API unreachable", "error");
  }
}

function renderCount() {
  if (!elements.countChip) return;
  const count = reminders.length;
  elements.countChip.textContent = count === 1 ? "1 item" : `${count} items`;
}

function renderReminders() {
  if (!elements.list) return;

  if (!reminders.length) {
    elements.list.innerHTML = "";
    if (elements.emptyState) elements.emptyState.style.display = "block";
    renderCount();
    return;
  }

  if (elements.emptyState) elements.emptyState.style.display = "none";
  const sorted = [...reminders].sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    const aTime = Number.isNaN(aDate.getTime()) ? Number.POSITIVE_INFINITY : aDate.getTime();
    const bTime = Number.isNaN(bDate.getTime()) ? Number.POSITIVE_INFINITY : bDate.getTime();
    return aTime - bTime;
  });

  elements.list.innerHTML = sorted
    .map((reminder) => {
      const status = getStatus(reminder.date);
      return `
        <li class="reminder-card" data-id="${reminder.id}">
          <div>
            <div class="badge ${status.tone}">${status.label}</div>
            <h3 class="reminder-title">${escapeHtml(reminder.title)}</h3>
            <p class="reminder-date">${formatDate(reminder.date)}</p>
          </div>
          <div class="actions">
            <button class="button ghost" onclick="startEdit(${reminder.id})">Edit</button>
            <button class="button danger" onclick="removeReminder(${reminder.id})">Delete</button>
          </div>
        </li>`;
    })
    .join("");

  renderCount();
}

async function loadReminders() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("API error");
    reminders = await res.json();
    renderReminders();
    setFeedback(reminders.length ? "" : "Add your first reminder to get started.");
    updateApiStatus("Local API: ready", "ready");
  } catch (error) {
    setFeedback("Unable to reach the reminders API.", "error");
    updateApiStatus("API unreachable", "warn");
  }
}

function resetForm() {
  editingId = null;
  elements.form.reset();
  elements.submit.textContent = "Save reminder";
  elements.cancel.hidden = true;
  elements.editingLabel.textContent = "";
}

function startEdit(id) {
  const reminder = reminders.find((item) => item.id === id);
  if (!reminder) return;
  editingId = id;
  elements.title.value = reminder.title || "";
  elements.date.value = reminder.date || "";
  elements.submit.textContent = "Update reminder";
  elements.cancel.hidden = false;
  elements.editingLabel.textContent = `Editing #${id}`;
  setFeedback("", "");
}

async function removeReminder(id) {
  const confirmDelete = window.confirm("Delete this reminder?");
  if (!confirmDelete) return;
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    if (editingId === id) resetForm();
    await loadReminders();
    setFeedback("Reminder removed.", "success");
  } catch (error) {
    setFeedback("Unable to delete right now.", "error");
  }
}

async function submitHandler(event) {
  event.preventDefault();
  const title = elements.title.value.trim();
  const date = elements.date.value;

  if (!title || !date) {
    setFeedback("Title and date are required.", "error");
    return;
  }

  const payload = { title, date };
  const url = editingId ? `${API}/${editingId}` : API;
  const method = editingId ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Request failed");

    setFeedback(editingId ? "Reminder updated." : "Reminder added!", "success");
    resetForm();
    await loadReminders();
  } catch (error) {
    setFeedback("Unable to save right now. Try again.", "error");
  }
}

function wireEvents() {
  elements.form?.addEventListener("submit", submitHandler);
  elements.cancel?.addEventListener("click", resetForm);
  elements.healthButton?.addEventListener("click", checkHealth);
}

(async function init() {
  wireEvents();
  await Promise.all([checkHealth(), loadReminders()]);
})();

window.startEdit = startEdit;
window.removeReminder = removeReminder;
