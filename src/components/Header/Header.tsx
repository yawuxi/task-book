// react
import React from "react"

// additional functional
// components
// styles
import './Header.scss'
import userLogo from '../../images/logotype.png'

interface ThemeProps {
  theme: string,
}

const Header: React.FC = () => {
  return (
    <header className="header">
      <button className="header__new-task br10">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 6.3999V13.5999" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.40002 10H13.6" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p>Нове завдання</p>
      </button>
      <button className="header__theme"><CurrentTheme theme='light' /></button>
      <div className="header__user">
        <p>Гарного дня, username</p>
        <img src={userLogo} alt="user logo" />
        <button className="header__menu shadow"></button>
      </div>
    </header>
  )
}

const CurrentTheme: React.FC<ThemeProps> = ({ theme }) => {
  switch (theme) {
    case 'light':
      return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.7">
            <path d="M21.5 12.79C21.3427 14.4922 20.7039 16.1144 19.6583 17.4668C18.6127 18.8192 17.2035 19.8458 15.5957 20.4265C13.9879 21.0073 12.248 21.1181 10.5795 20.7461C8.91104 20.3741 7.38302 19.5345 6.17425 18.3258C4.96548 17.117 4.12596 15.589 3.75393 13.9205C3.3819 12.252 3.49274 10.5121 4.07348 8.9043C4.65423 7.29651 5.68085 5.88737 7.03324 4.84175C8.38562 3.79614 10.0078 3.15731 11.71 3C10.7134 4.34827 10.2339 6.00945 10.3586 7.68141C10.4832 9.35338 11.2039 10.9251 12.3894 12.1106C13.575 13.2961 15.1466 14.0168 16.8186 14.1415C18.4906 14.2662 20.1518 13.7866 21.5 12.79V12.79Z" stroke="#282846" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      )
    case 'dark':
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
    default:
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
