import React, { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Container, Content } from './style'

import Header from '../../components/Header'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import Select from '../../components/Select'
import Button from '../../components/Button'

const AnswerQuestion: React.FC = () => {
  const { user, token } = useAuth()
  const { question_id } = useParams()

  const handleSubmit = data => {
    const headers = {
      Authorization: `Bearer ${token}`
    }
    api.post(
      '/answers',
      {
        value: data.value,
        question_id: question_id
      },
      { headers: headers }
    )
  }

  const options = [
    {
      value: true,
      label: 'Yes'
    },
    { value: false, label: 'No' }
  ]

  return (
    <>
      <Header />
      <Container>
        <Content>
          <h1>Answer Question X</h1>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="questionTitle">Question title</label>
            <Select name="value" options={options}></Select>
            <Button type="submit">Register</Button>
          </Form>
        </Content>
      </Container>
    </>
  )
}

export default AnswerQuestion
