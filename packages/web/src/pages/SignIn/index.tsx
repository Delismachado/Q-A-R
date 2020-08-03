import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Content, Background } from './style'

import Header from '../../components/Header'

const SignIn: React.FC = () => (
  <>
    <Header />
    <Container>
      <Content>
        <form>
          <h1>Log in with e-mail and password:</h1>
          <input placeholder="E-mail" />

          <input type="password" placeholder="Password" />

          <button type="submit">Enter</button>

          <a href="#">Forgot my password</a>
        </form>
        <Link to="/sign-up">Create new account</Link>
      </Content>
      <Background />
    </Container>
  </>
)

export default SignIn
