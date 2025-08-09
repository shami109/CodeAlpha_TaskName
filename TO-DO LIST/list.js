const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load tasks from local storage when page loads
window.onload = () => {
    loadTasks();

};

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = { text: taskText, completed: false };
    saveTaskToLocalStorage(task);
    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    taskSpan.onclick = () => toggleComplete(taskSpan, task);

    const actions = document.createElement("div");
    actions.className = "action-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTask(taskSpan, task);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(li, task);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskSpan);
    li.appendChild(actions);

    if (task.completed) {
        li.classList.add("completed");
    }

    taskList.appendChild(li);
}

function toggleComplete(span, task) {
    span.parentElement.classList.toggle("completed");
    task.completed = !task.completed;
    updateLocalStorage();
}

function editTask(span, task) {
    const newTask = prompt("Edit task:", span.textContent);
    if (newTask !== null && newTask.trim() !== "") {
        span.textContent = newTask.trim();
        task.text = newTask.trim();
        updateLocalStorage();
    }
}

function deleteTask(li, task) {
    li.remove();
    removeTaskFromLocalStorage(task);
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskToRemove.text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task));
}





