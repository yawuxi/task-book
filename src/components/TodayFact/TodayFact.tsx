// react
import React from "react"

// additional functional
// components
// styles
import './TodayFact.scss'

/**
 * TODO: feature: get fact from API, update every 24hrs
 * TODO: Wrap into React.memo, memoizate this component
*/

const TodayFact: React.FC = () => {
  return (
    <div className="today-fact user-component">
      <h3 className="today-fact__title h3-title">Факт дня</h3>
      <p className="today-fact__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis exercitationem esse reprehenderit repellat voluptatibus quis itaque rem et ducimus! Sequi magnam eaque nostrum cumque libero ipsam labore. Laudantium rem, aspernatur quia, id dolore nihil vero fugiat fuga tempore beatae necessitatibus?
      </p>
    </div>
  )
}

export default TodayFact
