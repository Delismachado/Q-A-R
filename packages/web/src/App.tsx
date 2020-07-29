import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes'

import GlobalStyle from './styles/Global'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </>
  )
}

export default App
