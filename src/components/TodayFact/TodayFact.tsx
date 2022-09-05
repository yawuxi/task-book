// react
import React, { useCallback, useEffect, useState } from "react"
// additional functional
import useHttp from "../../hooks/http.hook"
// components
import Loading from "../UI/Loading/Loading"
// styles
import './TodayFact.scss'

/**
 * TODO: feature: get fact from API, update every 24hrs
 * //TODO: Wrap into React.memo, memoizate this component
*/

const TodayFact: React.FC = () => {
  // hooks
  const [quote, setQuote] = useState<string>('')
  const { request, loading, error } = useHttp()

  useEffect(() => {
    request('https://favqs.com/api/qotd')
      .then(res => setQuote(res.quote.body))
  }, [])

  return (
    <div className="today-fact user-component">
      <h3 className="today-fact__title h3-title">Факт дня</h3>
      <p className="today-fact__text">
        {
          loading ? <Loading /> : quote
        }
      </p>
    </div>
  )
}

export default React.memo(TodayFact)
