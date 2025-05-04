class Task {
    #task //Private field

    constructor() {
        this.#task = [];
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
const taskName = document.querySelector('#taskName');
const taskPriority = document.querySelector('#taskPriority');
const tasklist = document.querySelector('.taskList');

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

buildTasks();