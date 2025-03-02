// App.js
import React, { useState, useEffect } from 'react';
import './app.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const task = {
      id: Date.now(),
      text: newTask.trim()
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={handleInputChange}
          className="task-input"
        />
        <button type="submit" className="add-button">Add Task</button>
      </form>
      
      <div className="task-list-container">
        <h2>Tasks</h2>
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Add some tasks to get started!</p>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className="task-item">
                <span className="task-text">{task.text}</span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;