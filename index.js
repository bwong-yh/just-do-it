const generateTemplate = task => {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center text-light">
        <span>${task}</span>
        <i class="fa-solid fa-eraser delete"></i>
    </li>
    `;
};

const addForm = document.querySelector('.add');
const todoList = document.querySelector('.todos');
const searchBox = document.querySelector('.search input');

addForm.addEventListener('submit', e => {
  e.preventDefault();

  const newTask = e.target.add.value.trim();

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
