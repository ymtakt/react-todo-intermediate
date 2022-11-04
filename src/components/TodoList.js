import React from 'react'
// import TodoAdd from './TodoAdd'

const TodoList = ({ id, title, onDelete, index }) => {

  const handleDelete = () => {
    onDelete();
  };


  return (
    <div key={id}>
      <span>{index}.</span>
      <p>{title}</p>
      <select>
        <option value="">未着手</option>
        <option value="">作業中</option>
        <option value="">完了</option>
      </select>
      <button>編集</button>
      <button onClick={() => handleDelete()}>削除</button>
    </div>
  )
}

export default TodoList