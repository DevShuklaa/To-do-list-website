document.getElementById('add-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    if (taskInput.value.trim() !== "") {
      // Create a new task
      const taskItem = document.createElement('li');
      taskItem.classList.add('task');
  
      // Task Text
      const taskText = document.createElement('span');
      taskText.textContent = taskInput.value;
  
      // Check Button
      const checkBtn = document.createElement('button');
      checkBtn.innerHTML = '✔';
      checkBtn.classList.add('check-btn');
      checkBtn.addEventListener('click', () => {
        taskItem.classList.toggle('complete');
      });
  
      // Delete Button
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '✖';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
      });
  
      // Append elements to the task
      taskItem.appendChild(checkBtn);
      taskItem.appendChild(taskText);
      taskItem.appendChild(deleteBtn);
  
      // Append task to the list
      taskList.appendChild(taskItem);
  
      // Clear input field
      taskInput.value = "";
    }
  });
  // Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list .task').forEach(taskItem => {
      const text = taskItem.querySelector('span').textContent;
      const isComplete = taskItem.classList.contains('complete');
      tasks.push({ text, isComplete });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Function to load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      addTaskToDOM(task.text, task.isComplete);
    });
  }
  
  // Function to add a task to the DOM
  function addTaskToDOM(taskText, isComplete = false) {
    const taskList = document.getElementById('task-list');
  
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    if (isComplete) {
      taskItem.classList.add('complete');
    }
  
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
  
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '✔';
    checkBtn.classList.add('check-btn');
    checkBtn.addEventListener('click', () => {
      taskItem.classList.toggle('complete');
      saveTasks();
    });
  
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '✖';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(taskItem);
      saveTasks();
    });
  
    taskItem.appendChild(checkBtn);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteBtn);
  
    taskList.appendChild(taskItem);
  }
  
  // Function to handle adding tasks
  function handleAddTask() {
    const taskInput = document.getElementById('task-input');
    if (taskInput.value.trim() !== "") {
      addTaskToDOM(taskInput.value);
      saveTasks();
      taskInput.value = "";
    }
  }
  
  // Event listener for adding tasks with the "Place" button
  document.getElementById('add-btn').addEventListener('click', handleAddTask);
  
  // Event listener for pressing "Enter" to add tasks
  document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  });
  
  // Load tasks on page load
  document.addEventListener('DOMContentLoaded', loadTasks);
  