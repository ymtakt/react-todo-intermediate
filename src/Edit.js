import React from 'react'

import { NavLink } from "react-router-dom";

const Edit = ({ key, date, id, title, text, status }) => {
  return (
    <>
      <NavLink to="/">TOP</NavLink>
      <div>Edit</div>
    </>
  )
}

export default Edit