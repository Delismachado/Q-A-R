import React from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.png'

import { Container, Content, Header } from './style'

const Home: React.FC = () => (
  <>
    <Header>
      <img src={logoImg} alt="Logo"/>
      <Link to="/sign-up">Sign up</Link>
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
