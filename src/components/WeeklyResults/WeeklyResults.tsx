// react
import React, { useEffect } from "react"
// additional functional
import { useAuthState } from "react-firebase-hooks/auth"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { doc, updateDoc } from "firebase/firestore"
import { Category } from "../../types/Category"
import { auth, firestoreDB } from "../../firebase"
import { WEEK_DAYS } from "../../utils/consts"
import dayjs from "dayjs"
// components
import Loading from "../UI/Loading/Loading"
// styles
import './WeeklyResults.scss'
import { iTaskItem } from "../../types/TaskItem"

/**
 * //TODO: feature: dynamic data from firebase
*/

const WeeklyResults: React.FC = () => {
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))
  // const currentDayInDigit = dayjs().day()

  // useEffect(() => {
  //   if (WEEK_DAYS[currentDayInDigit - 1] === 'ПН') {
  //     updateDoc(doc(firestoreDB, 'users', user!.uid), {
  //       tasksFinished: 0,
  //       tasksCompleted: 0,
  //     })
  //   }
  // }, [currentDayInDigit])

  return (
    <div className="weekly-results user-component">
      <h3 className="weekly-results__title h3-title">Успіхи за неділю</h3>
      <ul className="weekly-results__info">
        <li className="weekly-results__item">
          <h4 className="weekly-results__info-title">Створено</h4>
          <div className="weekly-results__circle">
            {
              userDataLoading ? <Loading />
                :
                userData?.pages.map((category: Category) => {
                  if (category.path === window.location.pathname || `/${category.path}` === window.location.pathname) {
                    return category.tasksList.length
                  }
                })
            }
            <span>задач</span>
          </div>
        </li>
        <li className="weekly-results__item">
          <h4 className="weekly-results__info-title">Завершено</h4>
          <div className="weekly-results__circle">
            {
              userDataLoading ? <Loading />
                :
                userData?.pages.map((category: Category) => {
                  if (category.path === window.location.pathname || `/${category.path}` === window.location.pathname) {
                    return category.tasksList.filter((task: iTaskItem) => task.isCompleted).length
                  }
                })
            }
            <span>задач</span>
          </div>
        </li>
        <li className="weekly-results__item">
          <h4 className="weekly-results__info-title">Видалено</h4>
          <div className="weekly-results__circle">
            {
              userDataLoading ? <Loading />
                :
                userData?.pages.map((category: Category) => {
                  if (category.path === window.location.pathname || `/${category.path}` === window.location.pathname) {
                    return category.tasksRemoved
                  }
                })
            }
            <span>задач</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default WeeklyResults
