import React, { useCallback } from 'react'

import { HeaderStyle } from './styles'
import { useAuth } from '../../hooks/auth'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.png'

const Header: React.FC = () => {
  const { user, signOut } = useAuth()

  const handleLogOut = useCallback(() => {
    signOut()
  }, [user])

  let userPanel
  if (user) {
    userPanel = (
      <>
        <p>Logged in as {user.email}</p>
        <button type="button" onClick={handleLogOut}>
          Go out
        </button>
      </>
    )
  } else {
    userPanel = <Link to="/sign-up">Sign up</Link>
  }

  return (
    <HeaderStyle>
      <Link to="/">
        <img src={logoImg} alt="Logo" />
      </Link>
      {userPanel}
    </HeaderStyle>
  )
}

export default Header
