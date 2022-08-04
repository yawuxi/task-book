// react
import React from "react"

// additional functional
// components
// styles
import './WeeklyResults.scss'

/**
 * TODO: feature: dynamic data from firebase
*/

const WeeklyResults: React.FC = () => {
  return (
    <div className="weekly-results user-component">
      <h3 className="weekly-results__title h3-title">Успіхи за неділю</h3>
      <ul className="weekly-results__info">
        <li className="weekly-results__item">
          <h4 className="weekly-results__info-title">Створено</h4>
          <div className="weekly-results__circle">
            113<br />
            <span>задач</span>
          </div>
        </li>
        <li className="weekly-results__item">
          <h4 className="weekly-results__info-title">Завершено</h4>
          <div className="weekly-results__circle">
            97<br />
            <span>задач</span>
          </div>
        </li>
        <li className="weekly-results__item">
          <h4 className="weekly-results__info-title">Видалено</h4>
          <div className="weekly-results__circle">
            14<br />
            <span>задач</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default WeeklyResults
