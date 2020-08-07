import React, { useState, useEffect } from 'react'

import { Container, Content } from './style'

import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
// import { Content } from '../../components/Input/style'

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    api.get('/questions').then(response => {
      setQuestions(response.data)
    })
  }, [user])

  return (
    <>
      <Header />
      <h1>Admin Dashboard</h1>
      <p>Logged in as {user.email}</p>
      <Container>
        <Content>
          <ul>
            {questions.map(question => (
              <li key={question.id}>
                {question.name}-
                <Link to={`/answers/${question.id}`}>View answers</Link>
              </li>
            ))}
          </ul>
        </Content>
      </Container>
    </>
  )
}

export default AdminDashboard
