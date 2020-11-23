import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import LabeledInput from '../../components/LabeledInput'
import { useAuth } from '../../hooks/auth'
import getValidationErrors from '../../utils/getValidationErrors'
import { Box, Button, ButtonGroup, Heading, Flex } from '@chakra-ui/react'
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons'

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
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Enter a valid e-mail address')
            .email('Enter a valid email address'),
          password: Yup.string().required('Enter a valid password')
        })

        await schema.validate(data, {
          abortEarly: false
        })

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
        borderColor="gray.200"
        borderRadius="10px"
        p="16"
        m="5"
        width="35%"
      >
        <Heading size="lg" textAlign="center" paddingBottom="1rem">
          Log in here
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
          <ButtonGroup spacing="8" mt="10">
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="gray"
              isLoading={false}
            >
              <Link to="/forgot">Forgot your password</Link>
            </Button>
            <Button
              rightIcon={<CheckIcon />}
              colorScheme="teal"
              isLoading={false}
              type="submit"
            >
              Click to login
            </Button>
          </ButtonGroup>
        </Form>
      </Box>
    </Box>
  )
}

export default SignIn
