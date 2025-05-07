/**
 * Отрисовывает список задач в элементе taskList.
 * 
 * Функция очищает текущее содержимое контейнера taskList и последовательно добавляет
 * элементы списка <li> для каждой задачи из массива tasks. Для каждой задачи создаётся
 * элемент с классом "task", который содержит название задачи и срок выполнения, а также
 * две кнопки: редактирования и удаления задачи. Кнопки вызывают функции editTask и deleteTask
 * с индексом задачи в массиве tasks.
 * // Предположим, что tasks = [{title: "Сделать отчёт", deadline: "2025-05-10"}]
 * renderTasks();
 * // В элемент taskList будет добавлен <li> с текстом "Сделать отчёт (до 2025-05-10)" и кнопками редактирования и удаления
 */
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
