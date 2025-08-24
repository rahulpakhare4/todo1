document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, idx) => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (todo.completed ? ' completed' : '');
      li.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <button class="delete-btn" title="Delete">&times;</button>
      `;
      li.querySelector('.todo-text').onclick = () => toggleTodo(idx);
      li.querySelector('.delete-btn').onclick = () => deleteTodo(idx);
      list.appendChild(li);
    });
  }

  function addTodo(text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
  }

  function deleteTodo(idx) {
    todos.splice(idx, 1);
    saveTodos();
    renderTodos();
  }

  function toggleTodo(idx) {
    todos[idx].completed = !todos[idx].completed;
    saveTodos();
    renderTodos();
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      addTodo(value);
      input.value = '';
    }
  };

  renderTodos();
});