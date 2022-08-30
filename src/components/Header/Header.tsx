// react
import React, { useContext } from "react"
// additional functional
import { ACTION_TYPES } from "../../shared/actionTypes"
import { TaskBookContext } from "../../shared/context"
import { iThemeProps } from "../../types/ThemeProps"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { auth, firestoreDB, storage } from "../../firebase"
import { doc } from "firebase/firestore"
import { ref } from "firebase/storage"
// components
import ToggleMenu from "../UI/ToggleMenu/ToggleMenu"
import Loading from "../UI/Loading/Loading"
// styles
import './Header.scss'

const Header: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))
  const [
    profilePictureLink,
    profilePictureLoading,
    profilePictureDownloadError,
  ] = useDownloadURL(ref(storage, `user-images/${user?.uid}/user-profile-picture`));

  // action types destructuring
  const {
    theme: { SET_THEME },
    header: { TOGGLE_MENU },
    sidebar: { TOGGLE_BURGER_MENU },
    modals: { createTask: { TOGGLE_CREATE_TASK } }
  } = ACTION_TYPES


  // changing theme dark/light
  const payloadValue = state.theme === 'light' ? 'dark' : 'light'

  // username
  const username = userData?.displayName === '' || userData?.displayName === undefined ? user?.email : userData?.displayName

  return (
    <header className="header">
      <button className="header__new-task br10" onClick={() => dispatch({ type: TOGGLE_CREATE_TASK })}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 6.3999V13.5999" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.40002 10H13.6" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p>Нове завдання</p>
      </button>
      <button className="header__theme" onClick={() => dispatch({ type: SET_THEME, payload: payloadValue })}>
        <CurrentTheme theme={state.theme} />
      </button>
      <button className="header__navigation" onClick={() => dispatch({ type: TOGGLE_BURGER_MENU })}><span></span></button>
      <div className="header__user">
        {userDataLoading ? <Loading styles={{ maxHeight: '32px' }} /> : <p>Гарного дня, {username}</p>}
        {
          profilePictureDownloadError ? <svg width="40" height="40" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

            :
            profilePictureLoading
              ?
              <Loading styles={{ width: '100px', height: '100px' }} />
              :
              <img src={profilePictureLink} alt="profile" />
        }
        <button
          onClick={() => dispatch({ type: TOGGLE_MENU })}
          className="header__menu shadow"></button>
      </div>
      <ToggleMenu />
    </header >
  )
}

export const CurrentTheme: React.FC<iThemeProps> = ({ theme = 'light' }) => {
  if (theme === 'light') {
    return (
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
          <path d="M21.5 12.79C21.3427 14.4922 20.7039 16.1144 19.6583 17.4668C18.6127 18.8192 17.2035 19.8458 15.5957 20.4265C13.9879 21.0073 12.248 21.1181 10.5795 20.7461C8.91104 20.3741 7.38302 19.5345 6.17425 18.3258C4.96548 17.117 4.12596 15.589 3.75393 13.9205C3.3819 12.252 3.49274 10.5121 4.07348 8.9043C4.65423 7.29651 5.68085 5.88737 7.03324 4.84175C8.38562 3.79614 10.0078 3.15731 11.71 3C10.7134 4.34827 10.2339 6.00945 10.3586 7.68141C10.4832 9.35338 11.2039 10.9251 12.3894 12.1106C13.575 13.2961 15.1466 14.0168 16.8186 14.1415C18.4906 14.2662 20.1518 13.7866 21.5 12.79V12.79Z" stroke="#282846" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    )
  } else {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 1V3" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21V23" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.21997 4.21997L5.63997 5.63997" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.36 18.3601L19.78 19.7801" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 12H3" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12H23" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.21997 19.7801L5.63997 18.3601" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.36 5.63997L19.78 4.21997" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
}

export default Header
