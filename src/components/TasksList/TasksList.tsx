// react
import React from "react"
// additional functional
import { iTaskItem } from "../../types/TaskItem"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { firestoreDB, auth } from "../../firebase"
import { doc } from "firebase/firestore"
import { iPage } from "../../types/Page"
// components
import TaskItem from "../TaskItem/TaskItem"
import Loading from "../UI/Loading/Loading"
// styles
import './TasksList.scss'

/**
 * //TODO: feature: dynamic task-list__items from context
 * //TODO: feature: display task item from user data base
*/

const TasksList: React.FC = () => {
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

  return (
    <div className="task-list user-component">
      <h3 className="task-list__title h3-title">Активні задачі</h3>
      <ul className="task-list__list">
        {userDataLoading ?
          <Loading />
          :
          userData?.pages.map((item: iPage) => {
            if (`/${item.path}` === window.location.pathname || item.path === window.location.pathname) {
              return item.tasksList.map((item: iTaskItem) => {
                if (!item.isCompleted) {
                  return <TaskItem {...item} key={item.id} />
                }
              })
            }
          })
        }
      </ul>
      <h3 className="task-list__title h3-title">Виповнені задачі</h3>
      <ul className="task-list__list">
        {userDataLoading ?
          <Loading />
          :
          userData?.pages.map((item: iPage) => {
            if (`/${item.path}` === window.location.pathname || item.path === window.location.pathname) {
              return item.tasksList.map((item: iTaskItem) => {
                if (item.isCompleted) {
                  return <TaskItem {...item} key={item.id} />
                }
              })
            }
          })
        }
      </ul>
    </div>
  )
}

export default TasksList
