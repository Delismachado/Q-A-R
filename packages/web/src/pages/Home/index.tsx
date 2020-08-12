import React from 'react'
import { Link } from 'react-router-dom'


import { Container, Content } from './style'

import Header from '../../components/Header'

const Home: React.FC = () => (
  <>
    <Header />
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
