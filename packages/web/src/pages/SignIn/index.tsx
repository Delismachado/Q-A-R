import { Box, Button, ButtonGroup, Heading, Flex } from '@chakra-ui/core'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import LabeledInput from '../../components/LabeledInput'
import { useAuth } from '../../hooks/auth'
import getValidationErrors from '../../utils/getValidationErrors'

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
        backgroundColor="gray.200"
      >
        <Heading size="lg" textAlign="center" paddingBottom="1rem">
          Sign in
        </Heading>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <LabeledInput
            label="E-mail"
            name="email"
            placeholder="your@email.com"
          />
          <LabeledInput
            label="Password:"
            name="password"
            type="password"
            placeholder="***"
            marginTop={2}
          />
          <ButtonGroup>
            <Button
              leftIcon="arrow-back"
              variantColor="pink"
              marginTop={6}
              isLoading={false}
            >
              <Link to="/forgot">Forgot your password</Link>
            </Button>
            <Button
              rightIcon="check"
              variantColor="pink"
              marginTop={6}
              marginRight="auto"
              isLoading={false}
              type="submit"
            >
              Login
            </Button>
          </ButtonGroup>
        </Form>
      </Box>
    </Box>
  )
}

export default SignIn
