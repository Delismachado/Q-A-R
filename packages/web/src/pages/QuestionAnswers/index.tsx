import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import { Container, Content, Table } from './style'

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
      <Container>
        <Content>
          <h2>List of answer</h2>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer, idx) => (
                <tr key={answer.id}>
                  <td>{idx + 1}</td>
                  <td>{answer.user.email}</td>
                  <td>{answer.value ? 'Yes' : 'No'}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>
      </Container>
    </>
  )
}

export default QuestionAnswers
