//react
import React from "react"
//additional functional
import { Rings } from 'react-loader-spinner'
//components
//styles
import './Loading.scss'

const Loading: React.FC<{ styles?: object }> = ({ styles }) => {
  return (
    <div className="task-book-loading" style={styles}>
      <Rings color="#29a19c" />
    </div>
  )
}

export default Loading
