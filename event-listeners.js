/**
 * Кнопка для открытия модального окна добавления новой задачи.
 * @type {HTMLButtonElement}
 */
 const addTask = document.getElementById("addTask");

 /**
  * Модальное окно для создания или редактирования задачи.
  * @type {HTMLElement}
  */
 const taskModal = document.getElementById("taskModal");
 
 /**
  * Кнопка закрытия модального окна задачи.
  * @type {HTMLElement}
  */
 const closeTask = document.querySelector(".closeTask");
 
 /**
  * Кнопка сохранения задачи из модального окна.
  * @type {HTMLButtonElement}
  */
 const saveTask = document.getElementById("saveTask");
 
 /**
  * Контейнер для списка задач.
  * @type {HTMLElement}
  */
 const taskList = document.getElementById("taskList");
 
 /**
  * Обработчик клика по кнопке "Добавить задачу".
  * Очищает поля формы модального окна, устанавливает заголовок "Добавить задачу",
  * сбрасывает индекс редактируемой задачи (editIndex) в null,
  * и отображает модальное окно.
  * 
  * @listens addTask#click
  */
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
 
 /**
  * Обработчик клика по кнопке закрытия модального окна задачи.
  * Скрывает модальное окно, устанавливая display в "none".
  * 
  * @listens closeTask#click
  */
 closeTask.addEventListener("click", () => {
     taskModal.style.display = "none";
 });
 
 /**
  * Обработчик клика по кнопке сохранения задачи.
  * Считывает значения из полей формы модального окна, валидирует обязательные поля,
  * создаёт новый объект задачи с уникальным id и временными метками,
  * либо обновляет существующую задачу, если редактирование активно.
  * После сохранения обновляет список задач и скрывает модальное окно.
  * 
  * @listens saveTask#click
  * 
  * @description
  * Валидирует, что заполнены поля:
  *  - заголовок задачи (title)
  *  - срок выполнения (deadline)
  *  - хотя бы один тег (tags)
  * Если проверка не пройдена - выводит alert и прерывает выполнение.
  * 
  * Создаёт объект задачи с полями:
  *  - id {string} - уникальный идентификатор (timestamp в строке)
  *  - title {string} - заголовок задачи
  *  - description {string} - описание задачи
  *  - deadline {string} - срок выполнения задачи
  *  - tags {string[]} - массив тегов
  *  - status {string} - статус задачи (например, "pending")
  *  - createdAt {string} - дата и время создания задачи в ISO формате
  *  - updatedAt {string} - дата и время последнего обновления в ISO формате
  * 
  * Если редактирование активно (editIndex !== null), обновляет существующую задачу,
  * сохраняя её оригинальный id.
  * Иначе добавляет новую задачу в массив tasks.
  * 
  * После этого вызывает saveTasks() для сохранения и обновления отображения,
  * и скрывает модальное окно.
  */
 saveTask.addEventListener("click", () => {
     const title = document.getElementById("taskTitle").value.trim();
     const description = document.getElementById("taskDesc").value.trim();
     const deadline = document.getElementById("taskDeadline").value;
     const tags = document.getElementById("taskTags").value
         .split(",")
         .map(tag => tag.trim())
         .filter(tag => tag);
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
 