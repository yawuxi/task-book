// react
import React from "react"
// additional functional
import { iTaskItem } from "../../types/TaskItem"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { firestoreDB, auth } from "../../firebase"
import { doc } from "firebase/firestore"
import { selectCurrentCategory } from "../../utils/selectCurrentCategory"
// components
import TaskItem from "../TaskItem/TaskItem"
import Loading from "../UI/Loading/Loading"
// styles
import './TasksList.scss'

const TasksList: React.FC = () => {
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

  console.log(selectCurrentCategory(userData!))

  return (
    <div className="task-list user-component">
      <h3 className="task-list__title h3-title">Активні задачі</h3>
      <ul className="task-list__list">
        {
          userDataLoading ?
            <Loading />
            :
            /**
            This function iterates over the tasksList array only if the current pathname,
             equals the path inside the item object.
            */
            selectCurrentCategory(userData!).tasksList.map((task: iTaskItem) => {
              if (!task.isCompleted) {
                return <TaskItem {...task} key={task.id} />
              }
            })
        }
      </ul>
      <h3 className="task-list__title h3-title">Виповнені задачі</h3>
      <ul className="task-list__list">
        {
          userDataLoading ?
            <Loading />
            :
            /**
            This function iterates over the tasksList array only if the current pathname,
            equals the path inside the item object.
            */
            selectCurrentCategory(userData!).tasksList.map((task: iTaskItem) => {
              if (task.isCompleted) {
                return <TaskItem {...task} key={task.id} />
              }
            })
        }
      </ul>
    </div>
  )
}

export default TasksList
