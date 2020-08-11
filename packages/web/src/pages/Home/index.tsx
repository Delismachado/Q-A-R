import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Content, Header } from './style'

const Home: React.FC = () => (
  <>
    <Header>
      <h1>Logo aqui</h1>
      <Link to="/sign-up">Faça seu cadastro</Link>
    </Header>
    <Container>
      <Content>
        <h1>Welcome to your smart platform</h1>
        <p>Lorem ipsum is placeholder text commonly used in the graphic</p>
        <Link to="/sign-in">SignIn</Link>
      </Content>
    </Container>
  </>
)

export default Home
