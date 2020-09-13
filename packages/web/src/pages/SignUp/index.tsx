import React, { useCallback, useRef } from 'react'
import api from '../../services/api'
import * as Yup from 'yup'

import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { Box, Heading, Button, ButtonGroup } from '@chakra-ui/core'
import { FormHandles } from '@unform/core'

import LabeledInput from '../../components/LabeledInput'
import Select from '../../components/LabeledSelect'
import getValidationErrors from '../../utils/getValidationErrors'

interface SignUpFormData {
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail required')
            .email('Enter a valid e-mail address'),
          password: Yup.string().min(6, 'Enter a valid password')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await api.post('/users', data)
        history.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        } else {
          console.log(err)
        }
      }
    },
    [SignUp, history]
  )
  const options = [
    { value: 'user', label: 'Startup' },
    { value: 'admin', label: 'Expert' }
  ]

  return (
    <Box d="flex" flexDir="column" alignItems="center">
      <Box
        border="1px"
        borderColor="gray.200"
        borderRadius="10px"
        p="16"
        m="5"
        width="35%"
        background="#f0f0f5"
        marginTop={2}
      >
        <Heading size="lg" textAlign="center" paddingBottom="1rem">
          Create your account
        </Heading>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <LabeledInput
            label="E-mail"
            name="email"
            type="text"
            placeholder="E-mail"
            marginTop={6}
          />
          <LabeledInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            marginTop={6}
          />
          <Select label="Who are you" name="role" options={options} />
          <ButtonGroup spacing={12}>
            <Link to="/sign-in">
              <Button
                m={4}
                marginTop={12}
                leftIcon="arrow-back"
                variantColor="teal"
                isLoading={false}
                type="submit"
              >
                Back to Login
              </Button>
            </Link>
            <Button
              m={4}
              marginTop={12}
              marginRight="50px"
              rightIcon="check"
              variantColor="teal"
              isLoading={false}
              type="submit"
            >
              Create account
            </Button>
          </ButtonGroup>
        </Form>
      </Box>
    </Box>
  )
}

export default SignUp
