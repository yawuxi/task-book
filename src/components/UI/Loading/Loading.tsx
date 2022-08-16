//react
import React from "react"
//additional functional
import { Rings } from 'react-loader-spinner'
//components
//styles
import './Loading.scss'

const Loading: React.FC = () => {
  return (
    <div className="task-book-loading">
      <Rings color="#29a19c" width="100%" height="100%" />
    </div>
  )
}

export default Loading
