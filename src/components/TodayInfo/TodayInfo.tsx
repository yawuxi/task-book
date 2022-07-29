// react
import React from "react"

// additional functional
// components
// styles
import './TodayInfo.scss'

const TodayInfo: React.FC = () => {
  return (
    <div className="today-info user-component">
      <h3 className="today-info__title h3-title">Такс, такс, такс</h3>
      <div className="today-info__content">
        <div className="today-info__item">
          <h4 className="today-info__item-title">На годиннику в нас</h4>
          <span className="today-info__value">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#282846" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 6V12L16 14" stroke="#282846" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            12:30:43
          </span>
        </div>
        <div className="today-info__item">
          <h4 className="today-info__item-title">А сьогодні в нас</h4>
          <span className="today-info__value">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#282846" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 2V6" stroke="#282846" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 2V6" stroke="#282846" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 10H21" stroke="#282846" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            29 липня 2022
          </span>
        </div>
      </div>
    </div>
  )
}

export default TodayInfo
