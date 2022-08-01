// react
import React from "react"

// additional functional
// components
import TaskItem from "../TaskItem/TaskItem"
// styles
import './TaskList.scss'

/**
 * TODO: feature: dynamic task-list__items from context
*/

const TaskList: React.FC = () => {
  return (
    <div className="task-list user-component">
      <h3 className="task-list__title h3-title">Активні задачі</h3>
      <ul className="task-list__list">
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </ul>
      <h3 className="task-list__title h3-title">Виповнені задачі</h3>
      <ul className="task-list__list">
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </ul>
    </div >
  )
}

export default TaskList
