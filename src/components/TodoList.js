import React from 'react'
import Style from "./TodoList.module.css";

import { TextField, TextareaAutosize } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



export const TodoList = ({ filteredTodos, handleEditTitle, handleEditText, handleEditStatus, handleEdit, handleDelete }) => {

  return (
    <div>
      <h2>タスク一覧：</h2>
      <ul>
        {filteredTodos.map((todo, index) => (
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
  )
}
