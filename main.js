let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const editFormElement = document.querySelector("#edit-form");
const createFormElement = document.querySelector("#create-form");

const inputElement = document.querySelector("#input-element");
const inputEditElement = document.querySelector("#edit-input-element");

const tasksListElement = document.querySelector("#tasks-list");

const btnAddElement = document.querySelector("#btn-add");
const btnSaveElement = document.querySelector("#btn-save");
const btnCancelElement = document.querySelector("#btn-cancel");

const taskCountElement = document.querySelector("#task-count");

let editId;

createFormElement.addEventListener("submit", createTask);

//! CREATE
function createTask(e) {
  e.preventDefault();

  if (inputElement.value === "") {
    alert("Enter some task");
    return;
  }

  const newTask = {
    id: tasks.length + 1,
    content: inputElement.value,
  };

  const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  currentTasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(currentTasks));
  tasks = currentTasks;

  inputElement.value = "";

  readTasks();
}

//! READ

function readTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasksListElement.innerHTML = "";
  tasks.forEach((task, idx) => {
    tasksListElement.innerHTML += `
      <li>
        <span>#${idx + 1} ${task.content}</span>
        <div class="btn-group">
          <button class="btn btn-edit" onclick="updateTask(${idx})">Edit </button>
          <button class="btn btn-delete" onclick="deleteTask(${idx})">✖</button>
        </div>
      </li>`;
  });
  updateTaskCount();
}

//! DELETE

function deleteTask(id) {
  const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  currentTasks.splice(id, 1);

  localStorage.setItem("tasks", JSON.stringify(currentTasks));
  tasks = currentTasks;

  readTasks();
}

//! UPDATE

function updateTask(id) {
  if (createFormElement.classList.contains("show")) {
    createFormElement.classList.remove("show");
  }
  createFormElement.classList.add("hide");
  editFormElement.classList.remove("hide");
  editFormElement.classList.add("show");

  inputEditElement.value = tasks[id].content;
  editId = id;
}

editFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  tasks[editId].content = inputEditElement.value;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  readTasks();

  createFormElement.classList.remove("hide");
  createFormElement.classList.add("show");

  editFormElement.classList.remove("show");
  editFormElement.classList.add("hide");
});

btnCancelElement.addEventListener("click", () => {
  createFormElement.classList.remove("hide");
  createFormElement.classList.add("show");

  editFormElement.classList.remove("show");
  editFormElement.classList.add("hide");
});

function updateTaskCount() {
  const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskCountElement.textContent = `Your remaining tasks: ${currentTasks.length}`;
}

readTasks();
