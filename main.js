class Task {
    #task //Private field
    #storagekey = "task";

    constructor() {
        this.#task = this.#loadtask();
    }

    #loadtask() {
        const taskJ = localStorage.getItem(this.#storagekey);
        return taskJ ? JSON.parse(taskJ) : [];
    }

    #savetask() {
        localStorage.setItem(this.#storagekey, JSON.stringify(this.#task));
    }

    addTask(name, priority) {
        const task = {
            id: Date.now(),
            name,
            priority
        };
        this.#task.push(task);
        return task;
    }

    deleteTask(id) {
        this.#task = this.#task.filter(task => task.id !== id);
    }

    getTask() {
        return [...this.#task];
    }
}

const taskManager = new Task();
const taskForm = document.querySelector('.taskForm');
const taskName = document.getElementById('taskName');
const taskPriority = document.getElementById('taskPriority');
const tasklist = document.querySelector('.tasklist');

function buildTasks() {
    tasklist.innerHTML = "";
    const tasks = taskManager.getTask();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.priority.toLowerCase());
        li.innerHTML = `
        <span>${task.name} (${task.priority})</span>
        <button data-id="${task.id}">Delete</button>
        `;
        tasklist.appendChild(li);
    });
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = taskName.value.trim();
    const priority = taskPriority.value;
    if (name) {
        taskManager.addTask(name, priority);
        buildTasks();
        taskForm.reset();
    }
});

tasklist.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const id = Number(e.target.dataset.id);
        taskManager.deleteTask(id);
        buildTasks();
    }
});

buildTasks();