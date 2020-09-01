import React, { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'

import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { StyledForm } from './style'

import Header from '../../components/Header'
import Container from '../../components/Container'
import Content from '../../components/Content'
import { Box, Heading } from '@chakra-ui/core'

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
      console.log(user)
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
    <Box d="flex" flexDir="column" alignItems="center">
      <Box
        border="1px"
        borderRadius="10px"
        p="6"
        m="10"
        width="25%"
        background="#f0f0f5"
      >
        <Heading>Sign in</Heading>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" placeholder="your@email.com" />
          <Input
            name="password"
            type="Password"
            placeholder="***"
            marginTop={2}
          />
          <Button type="submit">Login</Button>
        </Form>
        <Button>
          <Link to="/forgot">Forgot your password</Link>
        </Button>
      </Box>
    </Box>
  )
}

export default SignIn
