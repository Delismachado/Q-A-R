import React, { useCallback, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Container, Table } from './style'

import Header from '../../components/Header'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import Content from '../../components/Content'

interface UserAnswersResponse {
  id: string
  question: {
    name: string
  }
  value: boolean
}

const UserAnswers: React.FC = () => {
  const [answers, setAnswers] = useState<UserAnswersResponse[]>([])
  const { user_id } = useParams()
  const { token } = useAuth()

  useEffect(() => {
    api
      .get(`/users/${user_id}/answers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setAnswers(response.data)
      })
  }, [token, user_id])

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Table>
            <h2>User answers</h2>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Answers</th>
              </tr>
            </thead>
            {answers.map((answer, idx) => (
              <tr key={answer.id}>
                <td>{idx + 1}</td>
                <td>{answer.question.name}</td>
                <td>{answer.value ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </Table>
        </Content>
        <Link to="/admin-dashboard">Go back</Link>
      </Container>
    </>
  )
}

export default UserAnswers
