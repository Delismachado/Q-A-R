import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Content } from './style'

import Header from '../../components/Header'

const Home: React.FC = () => (
  <>
    <Header />
    <Container>
      <Content>
        <h1>Home</h1>
        <Link to="/sign-in">Sign-in</Link><br/>
        <Link to="/sign-up">Sign-up</Link>
      </Content>
    </Container>
  </>
)

export default Home
