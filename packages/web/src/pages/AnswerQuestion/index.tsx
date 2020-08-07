import React, { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Container, Content } from './style'

import Header from '../../components/Header'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/auth'

const AnswerQuestion: React.FC = () => {
  const { user } = useAuth()
  const { questionId } = useParams()

  const handleSubmit = useCallback(() => {
    alert(questionId + ' ' + user.email)
  }, [questionId])

  return (
    <>
      <Header />
      <Container>
        <Content>
          <h1>Answer Question X</h1>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="questionTitle">Question title</label>
            <Input name="answer"></Input>
          </Form>
        </Content>
      </Container>
    </>
  )
}

export default AnswerQuestion
