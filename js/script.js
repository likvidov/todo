const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoDate = localStorage.getItem('toDoDate') ? JSON.parse(localStorage.getItem('toDoDate')) : [];
// console.log(JSON.parse(localStorage.getItem('toDoDate')))
// let toDoDate = !localStorage.getItem('toDoDate') ? localStorage.getItem('toDoDate') : [];

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  localStorage = JSON.stringify(toDoDate);
  toDoDate.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li)
    } else {
      todoList.append(li)
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    })

    li.querySelector('.todo-remove').addEventListener('click', function () {
      toDoDate = toDoDate.filter((i) => i !== item)
      localStorage.setItem("toDoDate", JSON.stringify(toDoDate));
      render();
    })
  })
}

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  if (headerInput.value) {
    const newToDo = {
      text: headerInput.value,
      completed: false
    }

    toDoDate.push(newToDo)
    headerInput.value = '';

    localStorage.setItem("toDoDate", JSON.stringify(toDoDate));
    render();
  } else {
    alert('Введите задачу')
  }
})

render();