const generateTemplate = task => {
  return `
    <li class="d-flex justify-content-between align-items-center text-light mb-2">
        <span>${task}</span>
        <i class="fa-solid fa-eraser delete"></i>
    </li>
    `;
};

const addForm = document.querySelector('.add');
const todoList = document.querySelector('.todos');
const searchBox = document.querySelector('.search input');
const errorMessage = document.querySelector('.error-message');

const resetAll = tasks => {
  tasks.forEach(task => task.classList.remove('duplicate-task'));
  errorMessage.classList.add('d-none');
};

addForm.addEventListener('submit', e => {
  e.preventDefault();
  const tasks = Array.from(todoList.children);
  const taskTexts = tasks.map(task => task.innerText.toLowerCase());

  resetAll(tasks);

  const newTask = e.target.add.value.trim();

  const foundTaskIndex = taskTexts.findIndex(
    task => task === newTask.toLowerCase()
  );

  if (foundTaskIndex > -1) {
    todoList.children[foundTaskIndex].classList.add('duplicate-task');
    errorMessage.classList.remove('d-none');
    return;
  }

  if (newTask.length) {
    todoList.innerHTML += generateTemplate(newTask);
    e.target.reset();
  }
});

todoList.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});

const filterTodos = term => {
  Array.from(todoList.children)
    .filter(task => !task.innerText.includes(term))
    .map(task => task.classList.add('filtered'));

  Array.from(todoList.children)
    .filter(task => task.innerText.includes(term))
    .map(task => task.classList.remove('filtered'));
};

searchBox.addEventListener('keyup', e => {
  e.preventDefault();

  filterTodos(e.target.value.trim());
});
