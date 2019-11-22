import ReactDOM from 'react-dom'
import React from 'react'

import styles from './css-modules/index.css'

const App = function() {
  return (
    <h1 className={styles.h1}>Test me images</h1>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)