import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Container, Content } from './style'

import Header from '../../components/Header'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

interface Answer {
  id: string
  value: boolean
  created_at: Date
  user: {
    id: string
    email: string
  }
}

const QuestionAnswers: React.FC = () => {
  const { question_id } = useParams()
  const [answers, setAnswers] = useState<Answer[]>([])
  const { token } = useAuth()

  useEffect(() => {
    api
      .get(`/questions/${question_id}/answers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setAnswers(response.data)
      })
  }, [question_id, token])

  return (
    <>
      <Header />
      <Container>
        <Content>
          <h1>QuestionAnswers X</h1>
          <ul>
            {answers.map(answer => (
              <li key={answer.id}>
                {answer.user.email} - {answer.value ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        </Content>
      </Container>
    </>
  )
}

export default QuestionAnswers
