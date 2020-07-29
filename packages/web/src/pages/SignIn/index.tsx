import React from 'react'
import { Container, Content, Background } from './style'

import Header from '../../components/Header'

const SignIn: React.FC = () => (
  <>
    <Header />
    <Container>
      <Content>
        <form>
          <h1> Faça seu login</h1>
          <input placeholder="E-mail" />

          <input type="password" placeholder="Senha" />

          <button type="submit">Entrar</button>

          <a href="forgot">Esqueci minha senha</a>
        </form>
        <a href="">Criar conta</a>
      </Content>
      <Background />
    </Container>
  </>
)

export default SignIn
