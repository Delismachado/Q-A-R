import React from 'react'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'

import { Container, Content, Background } from './style'
import Input from '../../components/Input'
import Select from '../../components/Select'
// import Header from '../../components/Header'
import api from '../../services/api'

const SignUp: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = (data: object): void => {
    api.post('/users', data)
  }

  const options = [
    { value: 'user', label: 'Startup' },
    { value: 'admin', label: 'Expert' }
  ]

  return (
    <Container>
      <Content>

        <Form onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <Input name="name" type="text" placeholder="Nome" />
          <Input name="email" type="text" placeholder="E-mail" />

          <Input name="password" type="text" placeholder="Senha" />

          <label htmlFor="acount">who are you:</label>
          <Select name="role" options={options} />

          <button type="submit">Register</button>
          <Link to="/sign-in">back to login</Link>
        </Form>
      </Content>
      <Background />
    </Container>
  )
}

export default SignUp
