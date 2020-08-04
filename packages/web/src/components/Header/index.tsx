import React from 'react'

// import { Link } from 'react-router-dom'

import { Container } from './styles'

// import Logo from '../../assets/logo.jpeg'

interface HeaderProps {
  size?: 'small' | 'large'
}

const Header: React.FC<HeaderProps> = ({ size = 'small' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <nav>
        <h1>Welcome to Expert System</h1>
      </nav>
    </header>
  </Container>
)

export default Header
