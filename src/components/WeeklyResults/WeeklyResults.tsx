// react
import React from "react"
// additional functional
import { useAuthState } from "react-firebase-hooks/auth"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { doc } from "firebase/firestore"
import { auth, firestoreDB } from "../../firebase"
// components
import Loading from "../UI/Loading/Loading"
// styles
import './WeeklyResults.scss'

/**
 * //TODO: feature: dynamic data from firebase
*/

const WeeklyResults: React.FC = () => {
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

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
                userData?.tasksCreated
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
                userData?.tasksFinished
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
                userData?.tasksRemoved
            }
            <span>задач</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default WeeklyResults
