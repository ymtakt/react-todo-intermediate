import React, { useEffect, useState } from "react";
import Style from "./App.module.css";
import { Filter } from "./components/Filter";
import TodoAdd from "./components/TodoAdd";
import { TodoList } from "./components/TodoList";

import { NavLink } from "react-router-dom";


import { TextField, TextareaAutosize, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { style } from "@mui/system";


function App() {
  const [todoId, setTodoId] = useState(0);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");
  const [todoStatus, setTodoStatus] = useState("未着手");
  // const [todos, setTodos] = useState([
  //   // { id: 0, title: todoTitle, status: status }
  // ]);

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });



  const [filter, setFilter] = useState("全て");

  const [edit, setEdit] = useState(true);

  const handleSetTodoTitle = (e) => {
    setTodoTitle(e.target.value);
  };

  const handleSetTodoText = (e) => {
    setTodoText(e.target.value);
  };

  const handleSetTodoStatus = (e) => {
    setTodoStatus(e.target.value);
  };
  const handleSetTodoFilter = (e) => {
    setFilter(e.target.value);
  };


  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleAddTodo();
  }

  const handleAddTodo = () => {
    const date = new Date();
    const ymd = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';

    const newTodos = {
      id: Math.floor(Math.random() * 1000),
      title: todoTitle,
      text: todoText,
      status: todoStatus,
      date: ymd,
      edit: edit,
    };
    if (todoTitle !== "") setTodos([...todos, newTodos]);
    setTodoTitle("");
    setTodoText("");
    setTodoStatus("未着手");

    // console.log(todos);

    // setTodos([
    //   ...todos,
    //   {
    //     id: todos.length + 1,
    //     title: todoTitle,
    //     status: status,
    //   },
    // ]);
    // // return setTodoId(todoId + 1);
    // setTodoTitle("");
  };

  const handleDelete = (id) => {
    //↓これはいる？
    // const newTodos = [...todos];
    const deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodo);

  };


  const handleEdit = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.edit = !todo.edit;
    setTodos(newTodos);
  }

  const handleEditTitle = (id, value) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = value;
      }
      return todo;
    });
    setTodos(newTodos)
  };

  const handleEditText = (id, value) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = value;
      }
      return todo;
    });
    setTodos(newTodos)
  };

  const handleEditStatus = (id, value) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.status = value;
      }
      return todo;
    });
    setTodos(newTodos)
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "未着手":
        return todo.status === "未着手";

      case "作業中":
        return todo.status === "作業中";

      case "完了":
        return todo.status === "完了";

      default:
        return todo;
    }
  })



  //ローカルストレージへの保存処理
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])




  return (
    <Container sx={{}} className={Style.App}>
      <Box sx={{}} >
        <TodoAdd
          handleOnSubmit={handleOnSubmit}
          todoTitle={todoTitle}
          handleSetTodoTitle={handleSetTodoTitle}
          todoText={todoText}
          handleSetTodoText={handleSetTodoText}
          todoStatus={todoStatus}
          handleSetTodoStatus={handleSetTodoStatus}
        />

        <Filter filter={filter} handleSetTodoFilter={handleSetTodoFilter} />

        <TodoList
          filteredTodos={filteredTodos}
          handleEditTitle={handleEditTitle}
          handleEditText={handleEditText}
          handleEditStatus={handleEditStatus}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

      </Box>
    </Container>
  );
}

export default App;
