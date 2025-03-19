
const addTask = document.getElementById("addTask");
const taskModal = document.getElementById("taskModal");
const close = document.querySelector(".close");
const saveTask = document.getElementById("saveTask");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.innerHTML = `
            <span>${task.title} (до ${task.deadline})</span> <div><button class="but-task" onclick="editTask(${index})">✏️</button> <button class="but-task" onclick="deleteTask(${index})">🗑️</button></div>`;
            taskList.appendChild(li);
        });
    }

addTask.addEventListener("click", () => {
    editIndex = null;
    document.getElementById("modalTitle").textContent = "Добавить задачу";
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskDeadline").value = "";
    document.getElementById("taskTags").value = "";
    document.getElementById("taskStatus").value = "pending";
    taskModal.style.display = "flex";
});

close.addEventListener("click", () => {
    taskModal.style.display = "none";
});

saveTask.addEventListener("click", () => {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDesc").value.trim();
    const deadline = document.getElementById("taskDeadline").value;
    const tags = document.getElementById("taskTags").value.split(",").map(tag => tag.trim()).filter(tag => tag);
    const status = document.getElementById("taskStatus").value;
        
    if (!title || !deadline || tags.length === 0) {
        alert("Заполните все поля!");
        return;
    }

    const newTask = {
        id: Date.now().toString(),
        title,
        description,
        deadline,
        tags,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
        tasks[editIndex] = { ...newTask, id: tasks[editIndex].id };
    } else {
        tasks.push(newTask);
    }

    saveTasks();
    taskModal.style.display = "none";
});

window.editTask = (index) => {
    editIndex = index;
    const task = tasks[index];
    document.getElementById("modalTitle").textContent = "Редактировать задачу";
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDesc").value = task.description;
    document.getElementById("taskDeadline").value = task.deadline;
    document.getElementById("taskTags").value = task.tags.join(", ");
    document.getElementById("taskStatus").value = task.status;
    taskModal.style.display = "flex";
};

window.deleteTask = (index) => {
    if (confirm("Удалить задачу?")) {
    tasks.splice(index, 1);
    saveTasks();
    }
};

searchInput.addEventListener("input", () => {
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchInput.value.toLowerCase()));
    renderTasks(filteredTasks);
});

sortSelect.addEventListener("change", () => {
    if (sortSelect.value === "title") {
        tasks.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    renderTasks();
});

renderTasks();

