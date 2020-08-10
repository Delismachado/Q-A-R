import React, { useEffect, useState } from 'react'

import { Container, Content } from './style'

import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'

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
      <Header />
      <Container>
        <Content>
          <h1>User Dashboard</h1>
          <p>Logged in as {user.email}</p>
          <ul>
            {questions.map(question => (
              <li key={question.id}>
                {question.name} -{' '}
                <Link to={`/questions/${question.id}`}>Answer</Link>
              </li>
            ))}
          </ul>
        </Content>
      </Container>
    </>
  )
}

export default UserDashboard
