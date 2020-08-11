import React, { useState, useEffect } from 'react'

import { Container, Content } from './style'

import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import Select, {OptionType} from '../../components/Select'
// import { Content } from '../../components/Input/style'

interface CreateQuestionData {
  name: string
  type: string
  description: string
}

const AdminDashboard: React.FC = () => {
  const { user, token } = useAuth()
  const [questions, setQuestions] = useState([])
  const [users, setUsers] = useState([])

  const options: OptionType = [{ value: 'boolean', label: 'Yes/No' }]

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

  useEffect(() => {
    api
      .get('/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUsers(response.data)
      })
  }, [user])

  const handleNewQuestion = (data: CreateQuestionData): void => {
    api.post('/questions', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <h1>Admin Dashboard</h1>
          <Form onSubmit={handleNewQuestion}>
            <h2>Create new question</h2>
            <Input placeholder="Question title" name="name" />
            <Select name="type" options={options} />
            <Input placeholder="Description" name="description" />
            <button className="button" type="submit">
              Register
            </button>
          </Form>
          <div>
            <h2>Questions:</h2>
            <ul>
              {questions.map(question => (
                <li key={question.id}>
                  {question.name}-
                  <Link to={`/answers/${question.id}`}>View answers</Link>
                </li>
              ))}
            </ul>
            <h2>Users:</h2>
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  {user.email}-
                  <Link to={`/users/${user.id}/answers`}>View answers</Link>
                </li>
              ))}
            </ul>
          </div>
        </Content>
      </Container>
    </>
  )
}

export default AdminDashboard
