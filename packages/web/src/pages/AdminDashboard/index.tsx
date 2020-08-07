import React, { useState, useCallback, useEffect } from 'react'

// import { Container, Content, Background } from './style'

import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

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
      <ul>
        {questions.map(question => (
          <li key={question.id}>{question.name}</li>
        ))}
      </ul>
    </>
  )
}

export default AdminDashboard
