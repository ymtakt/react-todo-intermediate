import React, { useEffect, useState } from "react";
import Style from "./App.module.css";
import Filter from "./components/Filter";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";

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
  const [todoStatus, setTodoStatus] = useState("未着手")
  const [todos, setTodos] = useState([
    // { id: 0, title: todoTitle, status: status }
  ]);

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
    console.log(todos);
  })



  //ローカルストレージへの保存処理
  useEffect(() => {
    const keep = JSON.stringify(todos);
    localStorage.setItem("KeepTodos", keep);

  }, [todos])

  //ローカルストレージから呼び出し処理
  useEffect(() => {
    const call = localStorage.getItem("KeepTodos");
    const localTodos = JSON.parse(call);

    if (localTodos) {
      setTodos(localTodos);
      console.log(todos)
    }
  }, [])


  return (
    <Container sx={{}} className={Style.App}>
      <Box sx={{}} >
        {/* <TodoAdd onAdd={handleAddTodo} /> */}
        <form onSubmit={handleOnSubmit}>

          <div>
            <h1>TODOリスト</h1>
            <div>
              <TextField
                fullWidth
                id="standard-basic"
                margin="normal"
                label="Standard"
                variant="standard"
                type="text"
                placeholder="TODOを入力してください"
                value={todoTitle}
                onChange={handleSetTodoTitle}
              />
            </div>
            <div>
              <TextareaAutosize
                aria-label="empty textarea"
                style={{ width: 600 }}
                type="text"
                placeholder="詳細を入力してください"
                value={todoText}
                onChange={handleSetTodoText}
              />
            </div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">ステータス：</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={todoStatus}
                onChange={handleSetTodoStatus}
              >
                <MenuItem selected value="未着手">未着手</MenuItem>
                <MenuItem value="作業中">作業中</MenuItem>
                <MenuItem value="完了">完了</MenuItem>
              </Select>
            </FormControl>
            {/* <button onClick={() => handleAddTodo()}>TODOの追加</button> */}
            <Button variant="contained" type="submit">TODOの追加</Button>
          </div>
        </form>


        {/* <Filter /> */}
        <div>
          <h2>ステータス：</h2>
          <Select
            fullWidth
            value={filter}
            onChange={handleSetTodoFilter}
          >
            <MenuItem selected value="全て">全て</MenuItem>
            <MenuItem value="未着手">未着手</MenuItem>
            <MenuItem value="作業中">作業中</MenuItem>
            <MenuItem value="完了">完了</MenuItem>
          </Select>
        </div>

        <div>
          <h2>タスク一覧：</h2>
          <ul>
            {filteredTodos.map((todo, index) => (
              // <TodoList
              //   index={index}
              //   id={todo.id}
              //   title={todo.title}
              //   onDelete={handleDelete(index)}
              // />
              <Card sx={{ m: 4 }} key={todo.id}>
                <CardContent>
                  <time>タスク作成日：{todo.date}</time>
                  <br />
                  {todo.edit ? <p>
                    <span>タスク名：</span>
                    {todo.title}
                    <br />
                    <span>詳細：</span>
                    {todo.text}
                    <br />
                    <span>進捗：</span>
                    {todo.status}
                  </p> :
                    <><TextField
                      fullWidth
                      id="standard-basic"
                      margin="normal"
                      label="Standard"
                      variant="standard"
                      type="text"
                      value={todo.title}
                      onChange={(e) => handleEditTitle(todo.id, e.target.value)}
                    />
                      <br />
                      <TextareaAutosize
                        type="text"
                        value={todo.text}
                        onChange={(e) => handleEditText(todo.id, e.target.value)}
                      />
                      <br />
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">ステータス：</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={todo.status}
                          onChange={(e) => handleEditStatus(todo.id, e.target.value)}
                        >
                          <MenuItem selected value="未着手">未着手</MenuItem>
                          <MenuItem value="作業中">作業中</MenuItem>
                          <MenuItem value="完了">完了</MenuItem>
                        </Select>
                      </FormControl>
                      <br />
                    </>
                  }

                  {/* <NavLink
                to="/edit"
                key={todo.id}
                date={todo.date}
                id={todo.id}
                title={todo.title}
                text={todo.text}
                status={todo.status}
                 >編集</NavLink> */}
                  <button className={Style.nonButton} onClick={() => handleEdit(todo.id)}>
                    {todo.edit ? <EditIcon /> : <AssignmentTurnedInIcon />}
                  </button>
                  <DeleteIcon onClick={() => handleDelete(todo.id)}>削除</DeleteIcon>
                </CardContent>
              </Card>
            )
            )}
          </ul>
        </div>

      </Box>
    </Container>
  );
}

export default App;
