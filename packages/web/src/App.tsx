import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import ThemeProvider from './theme'
import Routes from './routes'

import AppProvider from './hooks/index'

import Header from './components/Header'
import { CSSReset } from '@chakra-ui/core'

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <CSSReset />
        <AppProvider>
          <Header />
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
