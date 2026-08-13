const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

searchInput.addEventListener("input", render);

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  const query = searchInput.value.trim().toLowerCase();
  tasks.forEach((task, i) => {
    if (query && !task.text.toLowerCase().includes(query)) {
      return;
    }

    if (currentFilter === "active" && task.done) return;
    if (currentFilter === "done" && !task.done) return;

    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => {
      tasks[i].done = !tasks[i].done;
      save();
      render();
    });

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.className = "delete-btn";
    btn.addEventListener("click", () => {
      tasks.splice(i, 1);
      save();
      render();
    });

    li.append(span, btn);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.push({ text: input.value.trim(), done: false });
  input.value = "";
  save();
  render();
});

document.querySelectorAll("#filter-buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    document
      .querySelectorAll("#filter-buttons button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

render();
