// react
import React, { useContext } from "react"
// additional functional
import { TaskBookContext } from "../../../shared/context"
import { ACTION_TYPES } from "../../../shared/actionTypes"
import { Link, useLocation } from "react-router-dom"
// components
import { CurrentTheme } from "../../Header/Header"
// styles
import './ToggleMenu.scss'

const ToggleMenu: React.FC = () => {
  // hooks
  const { state, dispatch } = useContext(TaskBookContext)

  // destructuring
  const { theme: { SET_THEME } } = ACTION_TYPES
  const { header: { toggleMenu }, userMethods: { signOut } } = state

  // opening ToggleMenu modal when isOpen === true and close when isOpen === false
  const classes = toggleMenu ? 'toggle-menu user-component' : 'toggle-menu toggle-menu--hidden user-component';

  // changing theme dark/light
  const payloadValue = state.theme === 'light' ? 'dark' : 'light'

  // changing first navgation menu element
  const location = useLocation()
  const isOnMainPage = location.pathname === '/user-page' ?
    (
      <Link to="/">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p>На головну</p>
      </Link>
    ) : (
      <Link to="/user-page">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p>Особистий кабінет</p>
      </Link>
    )

  return (
    <div className={classes}>
      <ul className="toggle-menu__list">
        <li className="toggle-menu__item">
          {isOnMainPage}
        </li>
        <li className="toggle-menu__item">
          <button onClick={() => dispatch({ type: SET_THEME, payload: payloadValue })}>
            <CurrentTheme theme={state.theme} />
            <p>Темний режим</p>
          </button>
        </li>
        <li className="toggle-menu__item" onClick={signOut}>
          <button type="button">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.25 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H11.25" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.5 12.75L11.25 9L7.5 5.25" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.25 9H2.25" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Вийти</p>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ToggleMenu
