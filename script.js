let input = document.getElementById("taskInput");
let list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let filter = "all";

displayTasks();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

  let task = input.value.trim();

  if (task === "") {
    alert("Enter a task");
    return;
  }

  tasks.push({
    text: task,
    completed: false
  });

  input.value = "";

  saveTasks();
  displayTasks();
}

function displayTasks() {

  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<p>No tasks available</p>";
    return;
  }

  for (let i = 0; i < tasks.length; i++) {

    if (filter === "completed" && !tasks[i].completed) {
      continue;
    }

    if (filter === "pending" && tasks[i].completed) {
      continue;
    }

    let li = document.createElement("li");

    li.innerText = tasks[i].text;

    if (tasks[i].completed) {
      li.classList.add("completed");
    }

    // Toggle complete
    li.onclick = function () {
      tasks[i].completed = !tasks[i].completed;

      saveTasks();
      displayTasks();
    };

    // Button container
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("task-buttons");

    // Edit button
    let editBtn = document.createElement("button");

    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.onclick = function (e) {

      e.stopPropagation();

      let updatedTask = prompt(
        "Edit task",
        tasks[i].text
      );

      if (updatedTask !== null && updatedTask.trim() !== "") {

        tasks[i].text = updatedTask;

        saveTasks();
        displayTasks();
      }
    };

    // Delete button
    let deleteBtn = document.createElement("button");

    deleteBtn.innerText = "X";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function (e) {

      e.stopPropagation();

      tasks.splice(i, 1);

      saveTasks();
      displayTasks();
    };

    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    li.appendChild(buttonDiv);

    list.appendChild(li);
  }
}

function clearTasks() {

  tasks = [];

  saveTasks();
  displayTasks();
}

function showAll() {

  filter = "all";

  displayTasks();
}

function showCompleted() {

  filter = "completed";

  displayTasks();
}

function showPending() {

  filter = "pending";

  displayTasks();
}

// Enter key support
input.addEventListener("keypress", function (e) {

  if (e.key === "Enter") {
    addTask();
  }
});