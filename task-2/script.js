// DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const errorMessage = document.getElementById('errorMessage');
const emptyMessage = document.getElementById('emptyMessage');

// Task array
let tasks = [];

// Initialize app
function init() {
  loadTasksFromStorage();
  renderTasks();
  setupEventListeners();
}

// Load tasks from local storage
function loadTasksFromStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

// Save tasks to local storage
function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    showError();
    return;
  }

  hideError();

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasksToStorage();
  renderTasks();

  taskInput.value = '';
  taskInput.focus();
}

// Toggle task completion
function toggleTask(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  saveTasksToStorage();
  renderTasks();
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToStorage();
  renderTasks();
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyMessage.style.display = 'block';
    return;
  }

  emptyMessage.style.display = 'none';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const checkbox = document.createElement('div');
    checkbox.className = `task-checkbox ${task.completed ? 'checked' : ''}`;
    checkbox.addEventListener('click', () => toggleTask(task.id));

    const taskText = document.createElement('span');
    taskText.className = `task-text ${task.completed ? 'completed' : ''}`;
    taskText.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
  });
}

// Show error message
function showError() {
  errorMessage.style.display = 'block';
}

// Hide error message
function hideError() {
  errorMessage.style.display = 'none';
}

// Setup event listeners
function setupEventListeners() {
  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keydown', (e) => e.key === 'Enter' && addTask());
}

// Initialize app
init();
