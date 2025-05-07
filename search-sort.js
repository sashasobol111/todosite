/**
 * Элемент поля ввода для поиска задач по заголовку.
 * @type {HTMLInputElement}
 */
 const searchInput = document.getElementById("search");
 /**
  * Элемент выпадающего списка для выбора способа сортировки задач.
  * @type {HTMLSelectElement}
  */

 const sortSelect = document.getElementById("sort");
 
 /**
  * Обработчик события ввода текста в поле поиска.
  * Фильтрует массив задач по заголовку, учитывая регистр (поиск нечувствителен к регистру),
  * и вызывает renderTasks с отфильтрованным списком задач.
  * 
  * @listens searchInput#input
  * 
  * @description
  * При каждом изменении текста в поле поиска:
  *  - преобразует введённое значение в нижний регистр
  *  - фильтрует массив tasks, оставляя задачи, у которых заголовок содержит введённый текст
  *  - вызывает функцию renderTasks с отфильтрованным массивом для обновления отображения
  */

 searchInput.addEventListener("input", () => {
     const filteredTasks = tasks.filter(task =>
         task.title.toLowerCase().includes(searchInput.value.toLowerCase())
     );
     renderTasks(filteredTasks);
 });
 
 /**
  * Обработчик события изменения выбранного значения в списке сортировки.
  * Сортирует глобальный массив tasks по выбранному критерию:
  *  - по заголовку (алфавитно), если выбрано "title"
  *  - по дате создания (по возрастанию), если выбрано другое значение
  * После сортировки вызывает renderTasks для обновления отображения.
  * 
  * @listens sortSelect#change
  * 
  * @description
  * При изменении значения в селекте сортировки:
  *  - если выбран критерий "title", сортирует задачи по заголовку с учётом локали
  *  - иначе сортирует задачи по дате создания, преобразуя строки в объекты Date
  *  - обновляет отображение задач вызовом renderTasks без параметров (отображаются все задачи)
  */

 
 sortSelect.addEventListener("change", () => {
     if (sortSelect.value === "title") {
         tasks.sort((a, b) => a.title.localeCompare(b.title));
     } else {
         tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
     }
     renderTasks();
 });
 