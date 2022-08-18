// react
import React, { useContext } from "react"

// additional functional
// components
import TodayInfo from "../../components/TodayInfo/TodayInfo"
import TodayFact from "../../components/TodayFact/TodayFact"
import ProgressChart from "../../components/ProgressChart/ProgressChart"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../firebase"
import { TaskBookContext } from "../../shared/context"
// import
// styles
import './UserPage.scss'
import imgTest from '../../images/test-image.png'

/**
 * TODO: feature: ability to change profile picture, nickname and email
*/

const UserPage: React.FC = () => {
  const { state } = useContext(TaskBookContext)
  const [user] = useAuthState(auth)

  // username
  const profileUserName = state.displayName === "" || undefined ? user?.email : state.displayName

  return (
    <div className="main__content">
      <div className="main__left">
        <div className="user-page user-component">
          <div className="user-page__profile-picture">
            <img src={imgTest} alt="profile" />
            <p>змінити фото</p>
          </div>
          <div className="user-page__user-data">
            <label>
              <h3 className="user-page__title">Ваш нікнейм:</h3>
              <input type="text" placeholder={profileUserName} />
            </label>
            <label>
              <h3 className="user-page__title">Ваш пошта:</h3>
              <input type="text" placeholder="тут має бути поточний email" />
            </label>
            <button>Зберігти зміни</button>
          </div>
        </div>
      </div>
      <div className="main__right">
        <TodayInfo />
        <TodayFact />
        <ProgressChart />
      </div>
    </div>
  )
}

export default UserPage
