import React from 'react'

import { TextField, TextareaAutosize, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const TodoAdd = ({ handleOnSubmit, todoTitle, handleSetTodoTitle, todoText, handleSetTodoText, todoStatus, handleSetTodoStatus }) => {

  return (
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
  );
}

export default TodoAdd