// My Tasks Basic

// HTML Elements
let taskInputEl = document.getElementById("task-input");
let menuEl = document.getElementById("menu");
let tasksEl = document.getElementById("tasks");

// Global Variables
let tasks = initTasks();
displayTasks();

// Go Btn - Menu Listener
taskInputEl.addEventListener("keydown", taskSubmitHandler);

function taskSubmitHandler(e) {
  console.log(e.code);
  if (e.code === "Enter") {
    // add submitted task
    let userTask = taskInputEl.value;
    tasks.push(newTask(userTask));
    saveTasks();
    displayTasks();
    taskInputEl.value = "";
  }
}

// MENU FUNCTIONS
function toggleTask() {
  let taskIndex = +prompt("Please enter number of task to toggle:");
  let task = tasks[taskIndex];
  if (task.completed === "") {
    task.completed = "completed";
  } else {
    task.completed = "";
  }
  saveTasks();
  displayTasks();
}

function removeTask() {
  let taskIndex = +prompt("Please enter number of task to remove:");
  tasks.splice(taskIndex, 1);
  saveTasks();
  displayTasks();
}

function clearAll() {
  tasks = [];
  saveTasks();
  displayTasks();
}

// HELPERS
function initTasks() {
  let jsonTasks = localStorage.getItem("tasks");
  return JSON.parse(jsonTasks) ?? [];
}

function displayTasks() {
  let outputStr = "";
  for (let i = 0; i < tasks.length; i++) {
    outputStr += getTaskHTMLStr(tasks[i], i);
  }
  tasksEl.innerHTML = outputStr;
}

function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: "",
  };
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTaskHTMLStr(task, index) {
  return `
    <div>
    <input type="checkbox">
       ${task.description}
       <button>Remove</button>
    </div>
  `;
}
