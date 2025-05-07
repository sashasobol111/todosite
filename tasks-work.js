/**
 * Массив задач, загружаемый из localStorage.
 * Если в localStorage нет сохранённых задач, инициализируется пустым массивом.
 * Каждая задача представляет собой объект со следующими свойствами:
 *  - title {string} - заголовок задачи
 *  - description {string} - описание задачи
 *  - deadline {string} - срок выполнения задачи в формате даты
 *  - tags {string[]} - массив тегов, связанных с задачей
 *  - status {string} - статус задачи (например, "выполнена", "в процессе" и т.д.)
 */
 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 /**
  * Индекс задачи, которая в данный момент редактируется.
  * Если редактирование не активно, значение равно null.
 let editIndex = null;
 /**
  * Сохраняет текущий массив задач в localStorage.
  * После сохранения вызывает функцию renderTasks для обновления отображения списка задач.
  * 
  * Использует JSON.stringify для преобразования массива задач в строку перед сохранением.
  */
 function saveTasks() {
     localStorage.setItem("tasks", JSON.stringify(tasks));
     renderTasks();
 }
 
 /**
  * Открывает модальное окно редактирования задачи и заполняет поля формы данными выбранной задачи.
  * Устанавливает глобальную переменную editIndex в индекс редактируемой задачи.
  * 
  * @param {number} index Индекс задачи в массиве tasks, которую нужно отредактировать.
  * 
  * @fires renderTasks  - (косвенно, при сохранении задачи)
  * 
  * @description
  * Функция:
  *  - устанавливает заголовок модального окна в "Редактировать задачу"
  *  - заполняет поля формы значениями из выбранной задачи:
  *    - title (заголовок)
  *    - description (описание)
  *    - deadline (срок)
  *    - tags (массив тегов преобразуется в строку через запятую)
  *    - status (статус задачи)
  *  - отображает модальное окно (устанавливает style.display = "flex")
  */
 document.editTask = (index) => {
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
 
 /**
  * Удаляет задачу из массива tasks по указанному индексу после подтверждения пользователя.
  * Если пользователь подтверждает удаление, задача удаляется из массива,
  * затем вызывается saveTasks для сохранения изменений и обновления интерфейса.
  * 
  * @param {number} index Индекс задачи в массиве tasks, которую необходимо удалить.
  * 
  * @description
  * Функция:
  *  - выводит окно подтверждения с сообщением "Удалить задачу?"
  *  - если пользователь нажимает "ОК", удаляет задачу из массива tasks методом splice
  *  - сохраняет обновлённый массив задач и обновляет отображение вызовом saveTasks
  */
 
 document.deleteTask = (index) => {
     if (confirm("Удалить задачу?")) {
         tasks.splice(index, 1);
         saveTasks();
     }
 };
 


renderTasks();

