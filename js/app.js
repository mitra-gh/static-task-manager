const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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

render();
