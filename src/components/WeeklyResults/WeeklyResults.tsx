// react
import React from "react"
// additional functional
import { useAuthState } from "react-firebase-hooks/auth"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { doc } from "firebase/firestore"
import { Category } from "../../types/Category"
import { auth, firestoreDB } from "../../firebase"
// components
import Loading from "../UI/Loading/Loading"
import CountUp from 'react-countup';
// styles
import './WeeklyResults.scss'
import { iTaskItem } from "../../types/TaskItem"

function setInfoData(data: { [propName: string]: any }, infoType: string) {
  let preResult;
  switch (infoType) {
    default:
      return 0
    case 'created':
      preResult = data?.pages.map((category: Category) => {
        if (category.path === window.location.pathname || `/${category.path}` === window.location.pathname) {
          return category.tasksList.length
        }
      })
      break;
    case 'completed':
      preResult = data?.pages.map((category: Category) => {
        if (category.path === window.location.pathname || `/${category.path}` === window.location.pathname) {
          return category.tasksList.filter((task: iTaskItem) => task.isCompleted).length
        }
      })
      break;
    case 'removed':
      preResult = data?.pages.map((category: Category) => {
        if (category.path === window.location.pathname || `/${category.path}` === window.location.pathname) {
          return category.tasksRemoved
        }
      })
      break;
  }

  return preResult.filter((item: number) => typeof item === 'number')[0]
}

const WeeklyResults: React.FC = () => {
  // hooks
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

  // variables
  const easingFunction = function (t: number, b: number, c: number, d: number) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  }

  return (
    <div className="weekly-results user-component">
      <h3 className="weekly-results__title h3-title">Успіхи за неділю</h3>
      <ul className="weekly-results__info">
        <li className="weekly-results__item">
          <h4 className="weekly-results__info-title">Створено</h4>
          <div className="weekly-results__circle">
            <span className="weekly-results__created">
              {
                userDataLoading ? <Loading />
                  :
                  <CountUp
                    end={setInfoData(userData!, 'created')}
                    duration={0.75}
                    useEasing
                    easingFn={easingFunction}
                  />
              }
            </span>
            <p>задач</p>
          </div>
        </li>
        <li className="weekly-results__item">
          <h4 className="weekly-results__info-title">Завершено</h4>
          <div className="weekly-results__circle">
            <span className="weekly-results__completed">
              {
                userDataLoading ? <Loading />
                  :
                  <CountUp
                    end={setInfoData(userData!, 'completed')}
                    duration={0.75}
                    useEasing
                    easingFn={easingFunction}
                  />
              }
            </span>
            <p>задач</p>
          </div>
        </li>
        <li className="weekly-results__item">
          <h4 className="weekly-results__info-title">Видалено</h4>
          <div className="weekly-results__circle">
            <span className="weekly-results__removed">
              {
                userDataLoading ? <Loading />
                  :
                  <CountUp
                    end={setInfoData(userData!, 'removed')}
                    duration={0.75}
                    useEasing
                    easingFn={easingFunction}
                  />
              }
            </span>
            <p>задач</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default WeeklyResults
