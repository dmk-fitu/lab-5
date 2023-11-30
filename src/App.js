import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [todoList, setTodoList] = useState(() => {
    // Використовуємо функцію, щоб ініціалізувати todoList із Local Storage, якщо вони є
    const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    return storedTodoList || [];
  });
  const id = todoList.length + 1;

  useEffect(() => {
    // При зміні todoList, оновлення даних в Local Storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  function handleCreateTodo() {
    const title = window.prompt('Enter todo:');
    setTodoList((todoList) => [
      ...todoList,
      { title: title, checked: false, id: id },
    ]);
  }

  function handleDeleteTodo(id) {
    setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
  }

  function handleCheckTodo(id) {
    console.log('hello');
    setTodoList((todoList) =>
      todoList.map((todo) =>
        todo.id === id
          ? { title: todo.title, checked: !todo.checked, id: todo.id }
          : todo
      )
    );
  }
  return (
    <div className="container center">
      <h1 className="center title">My just TODO it App</h1>
      <div className="flow-right controls">
        <span>Item count: {todoList.length}</span>
        <span>
          Unchecked count:{' '}
          {todoList.filter((todo) => todo.checked === false).length}
        </span>
      </div>
      <button onClick={handleCreateTodo} className="button center">
        New ToDo
      </button>
      <ul className="todo-list">
        {todoList &&
          todoList.map((todo) => (
            <li>
              <input
                type="checkbox"
                onChange={() => handleCheckTodo(todo.id)}
                checked={todo.checked}
              />
              <span>
                {todo.title} ID: {todo.id}
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)}>delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
