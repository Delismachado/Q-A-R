import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import theme from './theme'
import Routes from './routes'

import AppProvider from './hooks/index'

import Header from './components/Header'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

const App: React.FC = () => {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <Header />
          <Routes />
        </AppProvider>
      </ChakraProvider>
    </Router>
  )
}

export default App
