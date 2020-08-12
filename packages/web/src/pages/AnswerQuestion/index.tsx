import React from 'react'
import { useParams } from 'react-router-dom'
import { Form } from '@unform/web'

import api from '../../services/api'

import { useAuth } from '../../hooks/auth'

import Select from '../../components/Select'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Container from '../../components/Container'
import Content from '../../components/Content'

// import { Container, Content } from './style'

const AnswerQuestion: React.FC = () => {
  const { user, token } = useAuth()
  const { question_id } = useParams()

  const handleSubmit = data => {
    const headers = {
      Authorization: `Bearer ${token}`
    }
    api.post(
      `/users/${user.id}/answers`,
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
