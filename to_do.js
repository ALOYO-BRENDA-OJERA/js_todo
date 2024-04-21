let tasks = [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" onclick="toggleTask(${index})" ${task.completed ? "checked" : ""}>
      <span class="${task.completed ? "completed" : ""}">${task.text}</span>
      <button onclick="editTask(${index})"><i class="fa fa-edit"></i></button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit Task:", tasks[index].text);

  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function toggleTask(index) {
  // Store the previous completed status
  const previousStatus = tasks[index].completed;

  // Toggle the completed status
  tasks[index].completed = !tasks[index].completed;
  renderTasks();

  // If the task was just marked as completed, show the custom styled alert
  if (!previousStatus && tasks[index].completed) {
    showCompletionAlert();
  }
}

function showCompletionAlert() {
  const customAlert = document.createElement("div");
  customAlert.classList.add("custom-alert");
  customAlert.innerHTML = `
    <div class="alert-content">
      <span class="close-btn" onclick="closeAlert()">&times;</span>
      <h3><span class="highlight">🎉 Well done.</span> Keep going! You can do this... 🎉</h3>
      <button onclick="closeAlert()">OK</button>
    </div>
  `;
  document.body.appendChild(customAlert);
}

function closeAlert() {
  const customAlert = document.querySelector(".custom-alert");
  if (customAlert) {
    customAlert.remove();
  }
}

// Initial rendering
renderTasks();
