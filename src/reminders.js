let reminders = [];
let idCounter = 1;

function getAll() {
  return reminders;
}

function add(title, date) {
  const item = { id: idCounter++, title, date };
  reminders.push(item);
  return item;
}

function update(id, title, date) {
  const item = reminders.find(r => r.id == id);
  if (!item) return null;
  item.title = title;
  item.date = date;
  return item;
}

function remove(id) {
  const index = reminders.findIndex(r => r.id == id);
  if (index === -1) return null;
  return reminders.splice(index, 1)[0];
}

module.exports = { getAll, add, update, remove };
