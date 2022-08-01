// react
import React, { useContext } from "react"
// additional functional
import { iTaskItem } from "../TaskItem/TaskItem"
import { TaskBookContext } from "../../shared/context"
// components
import TaskItem from "../TaskItem/TaskItem"
// styles
import './TaskList.scss'

/**
 * //TODO: feature: dynamic task-list__items from context
*/

const TaskList: React.FC = () => {
  const { state } = useContext(TaskBookContext)

  return (
    <div className="task-list user-component">
      <h3 className="task-list__title h3-title">Активні задачі</h3>
      <ul className="task-list__list">
        {state.taskList.map((item: iTaskItem) => {
          return <TaskItem {...item} key={item.id} />
        })}
      </ul>
      <h3 className="task-list__title h3-title">Виповнені задачі</h3>
      <ul className="task-list__list"></ul>
    </div >
  )
}

export default TaskList
