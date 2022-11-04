import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const Filter = ({ filter, handleSetTodoFilter }) => {
  return (
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
  )
}
