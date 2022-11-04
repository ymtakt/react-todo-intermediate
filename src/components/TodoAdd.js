import React, { useState } from 'react'

const TodoAdd = ({ onAdd }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleSetTodoTitle = (e) => {
    setTodoTitle(e.target.value);
  };

  const handleAddTodo = () => {
    onAdd(todoTitle);
    setTodoTitle("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="TODOを入力してください"
        value={todoTitle}
        onChange={handleSetTodoTitle}
      />
      <button onClick={() => handleAddTodo()}>TODOの追加</button>
    </div>
  );
}

export default TodoAdd