import React from 'react'
import { Container, Content, Background } from './style'

const SignIn: React.FC = () => (
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
)

export default SignIn
