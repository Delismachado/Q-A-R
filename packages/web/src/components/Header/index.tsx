import React, { useCallback } from 'react'

// import { Link } from 'react-router-dom'

import { Container } from './styles'
import { useAuth } from '../../hooks/auth'

// import Logo from '../../assets/logo.jpeg'

interface HeaderProps {
  size?: 'small' | 'large'
}

const Header: React.FC<HeaderProps> = ({ size = 'small' }: HeaderProps) => {
  const { user, signOut } = useAuth()

  const handleLogOut = useCallback(() => {
    signOut()
  }, [user])

  return (
    <Container>
      <header>
        <h1>Welcome to Expert System</h1>
        {!!user && (
          <>
            <p>Logged in as {user.email}</p>
            <button type="button" onClick={handleLogOut}>
              Go out
            </button>
          </>
        )}
      </header>
    </Container>
  )
}

export default Header
