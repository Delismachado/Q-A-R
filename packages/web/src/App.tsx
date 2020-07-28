import React from 'react'

import GlobalStyle from './styles/Global'
import SignIn from './pages/SignIn'

import Header from './components/Header'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <SignIn />
      <GlobalStyle />
    </>
  )
}

export default App
