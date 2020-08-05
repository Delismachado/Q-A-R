import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Container, Content, Background } from './style'
import Input from '../../components/Input'

import Header from '../../components/Header'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const history = useHistory()
  const handleSubmit = (data: SignInFormData) => {
      try {
        history.push('/Home')
      } catch (err) {
      }
    }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form onSubmit={handleSubmit}>
            <h1>Log in with e-mail and password:</h1>

            <Input name="email" placeholder="email" />

            <Input name="password" type="password" placeholder="Password" />

            <button type="submit">Enter</button>

            <a href="#">Forgot my password</a>
          </Form>
          <Link to="/sign-up">Create new account</Link>
        </Content>
        <Background />
      </Container>
    </>
  )
}

export default SignIn
