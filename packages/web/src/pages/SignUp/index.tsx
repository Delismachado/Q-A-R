import React from 'react'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'

import api from '../../services/api'

import Header from '../../components/Header'
import Container from '../../components/Container'
import Content from '../../components/Content'
import Input from '../../components/Input'
import Select from '../../components/Select'

import { SignUpForm } from './style'

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
    <>
      <Header />
      <Container>
        <Content>
          <h2>Create your account</h2>
          <SignUpForm onSubmit={handleSubmit}>
            <Input name="email" type="text" placeholder="E-mail" />
            <Input name="password" type="password" placeholder="Password" />
            <label htmlFor="acount">Who are you:</label>
            <Select name="role" options={options} />
            <button type="submit">Register</button>
            <Link to="/sign-in">back to login</Link>
          </SignUpForm>
        </Content>
      </Container>
    </>
  )
}

export default SignUp
