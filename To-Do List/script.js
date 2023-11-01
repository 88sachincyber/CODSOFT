let tasks = [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.isCompleted ? 'complete' : 'pending';
        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleTask(${index})">${task.isCompleted ? 'Pending' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        const newTask = { name: taskName, isCompleted: false };
        tasks.push(newTask);
        renderTasks();
        taskInput.value = '';
        saveTasks();
    }
}

function editTask(index) {
    const newTask = prompt('Edit task:', tasks[index].name);
    if (newTask && newTask.trim() !== '') {
        tasks[index].name = newTask;
        renderTasks();
        saveTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
}

function toggleTask(index) {
    tasks[index].isCompleted = !tasks[index].isCompleted;
    renderTasks();
    saveTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

loadTasks();
