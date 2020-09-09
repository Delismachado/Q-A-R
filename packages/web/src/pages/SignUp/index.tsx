import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'

import Input from '../../components/Input'
import Select from '../../components/Select'

import api from '../../services/api'

import { Box, Heading, Button, FormControl, ButtonGroup } from '@chakra-ui/core'
import { SubmitHandler } from '@unform/core'

const SignUp: React.FC = () => {
  const history = useHistory()
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit: SubmitHandler<any> = (data: object): void => {
    api.post('/users', data)
    history.push('/')
  }

  const options = [
    { value: 'user', label: 'Startup' },
    { value: 'admin', label: 'Expert' }
  ]

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
        <Heading>Create your account</Heading>
        <Form onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            name="email"
            type="text"
            placeholder="E-mail"
            marginTop={2}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            marginTop={3}
          />
          <Select label="Who are you" name="role" options={options} />
          <ButtonGroup spacing={2}>
            <Link to="/sign-in">
              <Button
                m={4}
                leftIcon="arrow-back"
                variantColor="pink"
                isLoading={false}
                type="submit"
              >
                Back to Login
              </Button>
            </Link>
            <Button
              m={4}
              rightIcon="check"
              variantColor="teal"
              isLoading={false}
              type="submit"
            >
              Submit
            </Button>
          </ButtonGroup>
        </Form>
      </Box>
    </Box>
  )
}

export default SignUp
