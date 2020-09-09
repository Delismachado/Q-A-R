import React, { useEffect, useState } from 'react'

import { Table } from './style'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import Container from '../../components/Container'
import Content from '../../components/Content'

const UserDashboard: React.FC = () => {
  const { user, token } = useAuth()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    api
      .get('/questions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setQuestions(response.data)
      })
  }, [user])

  return (
    <>
      <Container>
        <Content>
          <h2>User Dashboard</h2>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Answers</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, idx) => (
                <tr key={question.id}>
                  <td>{idx + 1}</td>
                  <td>{question.name}</td>
                  <td>
                    <Link to={`/questions/${question.id}`}>Answer</Link>
                  </td>
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

export default UserDashboard
