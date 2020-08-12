import React, { useState, useEffect } from 'react'

import { Container, Content, StyledForm, Table } from './style'

import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import Select, { OptionType } from '../../components/Select'
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
        <h1>Admin Dashboard</h1>
        <Content>
          <h2>Create new question</h2>
          <StyledForm onSubmit={handleNewQuestion}>
            <Input placeholder="Question title" name="name" />
            <Select name="type" options={options} />
            <Input placeholder="Description" name="description" />
            <button className="button" type="submit">
              Register
            </button>
          </StyledForm>
        </Content>
        <Content>
          <h2>Questions</h2>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>View Answers</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, idx) => (
                <tr key={question.id}>
                  <td>{idx}</td>
                  <td>{question.name}</td>
                  <td>
                    <Link to={`/answers/${question.id}`}>View answers</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>
      </Container>
    </>
  )
}

export default AdminDashboard
