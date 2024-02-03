import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineFileDownloadDone } from 'react-icons/md';
import 'bootstrap';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', status: 'Not Completed' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [editModal, setEditModal] = useState({ isOpen: false, taskId: null });

  const handleAddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, { ...newTask, id: Date.now() }]);
    setNewTask({ name: '', description: '', status: 'Not Completed' });
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    setEditModal({ isOpen: true, taskId: id });
  };

  const handleUpdateTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editModal.taskId ? { ...todo, ...newTask } : todo
      )
    );
    setEditModal({ isOpen: false, taskId: null });
    setNewTask({ name: '', description: '', status: 'Not Completed' });
  };

  const handleStatusChange = (id, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(allTodos));
  }, [allTodos]);

  const filteredTodos = () => {
    if (filterStatus === 'completed') {
      return allTodos.filter((todo) => todo.status === 'Completed');
    } else if (filterStatus === 'notCompleted') {
      return allTodos.filter((todo) => todo.status === 'Not Completed');
    } else {
      return allTodos;
    }
  };

  return (
    <div className="App">
      <h2>My Todos</h2>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Task Name</label>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              placeholder="ToDo Name"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="ToDo description"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add Todo
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`isCompleteScreen ${isCompleteScreen === false ? 'active' : ''}`}
            onClick={() => {
              setIsCompleteScreen(false);
              setFilterStatus('notCompleted');
            }}
          >
            Not Completed
          </button>
          <button
            className={`isCompleteScreen ${isCompleteScreen === true ? 'active' : ''}`}
            onClick={() => {
              setIsCompleteScreen(true);
              setFilterStatus('completed');
            }}
          >
            Completed
          </button>
          <button
            className={`isCompleteScreen ${isCompleteScreen === false ? 'active' : ''}`}
            onClick={() => {
              setIsCompleteScreen(false);
              setFilterStatus('all');
            }}
          >
            All
          </button>
        </div>

        <div className="todo-list">
          {filteredTodos().map((todo) => (
            <div className="todo-list-item" key={todo.id}>
              <div>
                <h3>{todo.name}</h3>
                <p>{todo.description}</p>
                <p>Status: {todo.status}</p>
              </div>
              <div>
                <select
                  value={todo.status}
                  onChange={(e) => handleStatusChange(todo.id, e.target.value)}
                >
                  <option value="Not Completed">Not Completed</option>
                  <option value="Completed">Completed</option>
                </select>
                <button className="editBtn" onClick={() => handleEditTodo(todo.id)}>
                  Edit
                </button>
                <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(todo.id)} title="Delete" />
                {!todo.status && (
                  <MdOutlineFileDownloadDone
                    className="check-icon"
                    onClick={() => handleStatusChange(todo.id, 'Completed')}
                    title="Mark as Completed"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editModal.isOpen && (
        <div className="edit-modal">
          <h3>Edit Todo</h3>
          <label>Task Name</label>
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <label>Description</label>
          <input
            type="text"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <label>Status</label>
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleUpdateTodo}>Update</button>
        </div>
      )}
    </div>
  );
}

export default App;
