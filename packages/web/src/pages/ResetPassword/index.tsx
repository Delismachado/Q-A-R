import React, { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory, useLocation } from 'react-router-dom'

import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import { Button, Box } from '@chakra-ui/react'
import Input from '../../components/Input'

interface ResetPasswordFormData {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()
  const location = useLocation()
  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta'
          )
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const { password, password_confirmation } = data
        const token = location.search.replace('?token', '')

        if (!token) {
          throw new Error()
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token
        })

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
    [history, location.search]
  )
  return (
    <Box>
      <Box>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar senha</h1>

          <Input name="password" type="Password" placeholder="Nova Senha" />

          <Input
            name="password_confirmation"
            type="Password"
            placeholder="Confirmação da Senha"
          />

          <Button type="submit">Alterar senha</Button>
        </Form>
      </Box>
    </Box>
  )
}

export default ResetPassword
