// react
import React, { useContext } from "react"

// additional functional
import { TaskBookContext } from "../../shared/context"
// components
// styles
import './ToggleMenu.scss'
/**
 * TODO: feature: onClick account go over to UserPage component
 * TODO: feature: onClick theme button change theme to light\dark depends on last theme
 * TODO: feature: onClick exit button, log out from current account
 * // TODO: layout: if toggle-menu hidden use toggle-menu--hidden class
*/

const ToggleMenu: React.FC = () => {
  const { state } = useContext(TaskBookContext)
  const { header: { toggleMenu } } = state

  // opening ToggleMenu modal when isOpen === true and close when isOpen === false
  const classes = toggleMenu ? 'toggle-menu user-component' : 'toggle-menu toggle-menu--hidden user-component';

  return (
    <div className={classes}>
      <ul className="toggle-menu__list">
        <li className="toggle-menu__item">
          <a href="#">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Особистий кабінет</p>
          </a>
        </li>
        <li className="toggle-menu__item">
          <a href="#">
            <svg width="18" height="18" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M21.5 12.79C21.3427 14.4922 20.7039 16.1144 19.6583 17.4668C18.6127 18.8192 17.2035 19.8458 15.5957 20.4265C13.9879 21.0073 12.248 21.1181 10.5795 20.7461C8.91104 20.3741 7.38302 19.5345 6.17425 18.3258C4.96548 17.117 4.12596 15.589 3.75393 13.9205C3.3819 12.252 3.49274 10.5121 4.07348 8.9043C4.65423 7.29651 5.68085 5.88737 7.03324 4.84175C8.38562 3.79614 10.0078 3.15731 11.71 3C10.7134 4.34827 10.2339 6.00945 10.3586 7.68141C10.4832 9.35338 11.2039 10.9251 12.3894 12.1106C13.575 13.2961 15.1466 14.0168 16.8186 14.1415C18.4906 14.2662 20.1518 13.7866 21.5 12.79V12.79Z" stroke="#282846" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            <p>Темний режим</p>
          </a>
        </li>
        <li className="toggle-menu__item">
          <a href="#">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.25 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H11.25" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.5 12.75L11.25 9L7.5 5.25" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.25 9H2.25" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Вийти</p>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default ToggleMenu
