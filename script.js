// Load tasks when page opens
window.addEventListener("load", loadTasks);

button.addEventListener("click", addTask);

let tasks = [];

function addTask() {
const dateinput = document.getElementById("dateinput");
const taskDate = dateInput.value || "No date";  
const taskCount = document.getElementById("taskCount");
const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const taskText = input.value.trim();
  
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);

  const task = {
    id: Date.now(),
    text: taskText,
    date: taskDate,
    done: false
  };
  
  tasks.push(task);

  taskInput.value = "";
  dateInput.value = "";

  renderTask();
}

function createTaskElement(taskText, isDone = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");

  if (isDone) li.classList.add("done");

  // toggle done
  span.addEventListener("click", () => {
    li.classList.toggle("done");
    updateStorage();
  });

  // delete task
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateStorage();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);

  list.appendChild(li);
}

// Save one task
function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load all tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTaskElement(task.text, task.done);
  });
  updateStorage();
}

// Update storage (after toggle/delete)
function updateStorage() {
  const allTasks = document.querySelectorAll("li");

  let tasks = [];

  let remaining = 0;

  allTasks.forEach(li => {
    const isDone = li.classList.contains("done");

    if (!isDone) remaining++;

    tasks.push({
      text: li.querySelector("span").textContent,
      done: isDone
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskCount.textContent = remaining + " task(s) left";
}
function filterTasks(type) {
  const allTasks = document.querySelectorAll("li");

  allTasks.forEach(li => {
    const isDone = li.classList.contains("done");

    if (type === "all") {
      li.style.display = "flex";
    } else if (type === "done") {
      li.style.display = isDone ? "flex" : "none";
    } else if (type === "pending") {
      li.style.display = !isDone ? "flex" : "none";
    }
  });
}
const themeToggle = document.getElementById("themeToggle");

// load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "🌙";
  }
});
function toggleDone(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task" + (task.done ? " done" : "");

    div.innerHTML = `
      <div>
        <div class="text">${task.text}</div>
        <small>📅 ${task.date}</small>
      </div>

      <div class="actions">
        <button onclick="toggleDone(${task.id})">✓</button>
        <button onclick="deleteTask(${task.id})">✕</button>
      </div>
    `;

    list.appendChild(div);
  });
}
