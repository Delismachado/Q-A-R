import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Content, Background } from './style'

import Header from '../../components/Header'

const SignUp: React.FC = () => (
  <>
    <Header />
    <Container>
      <Content>
        <form>
          <h1>Create your account</h1>
          <input name="name" placeholder="Nome" />
          <input name="email" placeholder="E-mail" />

          <input name="password" placeholder="Senha" />

          <button type="submit">Register</button>
          <Link to="/sign-in">back to login</Link>
        </form>
      </Content>
      <Background />
    </Container>
  </>
)

export default SignUp
