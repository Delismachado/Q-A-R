import React, { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'

import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, StyledForm } from './style'
import Header from '../../components/Header'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn, user } = useAuth()
  const history = useHistory()
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn({
          email: data.email,
          password: data.password
        })

        history.push(`/${user.role}-dashboard`)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        } else {
          console.log(err)
        }
      }
    },
    [signIn, history]
  )
  return (
    <>
      <Header />
      <Container>
        <Content>
          <h1>Faça seu login</h1>
          <StyledForm ref={formRef} onSubmit={handleSubmit}>
            <Input name="email" placeholder="E-mail" />

            <Input name="password" type="Password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>
          </StyledForm>
          <Link to="/sign-up">Criar conta</Link>
          <a href="forgot">Esqueci minha senha</a>
        </Content>
      </Container>
    </>
  )
}

export default SignIn
