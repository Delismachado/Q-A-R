import React, { useState, useEffect, useRef, useCallback } from 'react'

import { Container, Content, StyledForm, Table } from './style'

import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import Select, { OptionType } from '../../components/Select'
import { FormHandles } from '@unform/core'
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

  const options: OptionType = [
    { value: 'true or false', label: 'True or false' },
    { value: 'choices', label: 'Choices' },
    { value: 'multiple choices', label: 'Multiple choices' }
  ]

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

  const formRef = useRef<FormHandles>(null)
  const [type, setType] = useState<string>('')

  interface OptionsFieldsProps {
    type: string
  }

  const [trueValueLabel, setTrueValueLabel] = useState('')
  const [falseValueLabel, setFalseValueLabel] = useState('')
  const TrueFalseFields: React.FC = () => {
    return (
      <fieldset>
        <input
          placeholder="True value label"
          value={trueValueLabel}
          onChange={e => setTrueValueLabel(e.target.value)}
        />
        <input
          placeholder="False value label"
          value={falseValueLabel}
          onChange={e => setFalseValueLabel(e.target.value)}
        />
      </fieldset>
    )
  }

  const [choices, setChoices] = useState([])
  const ChoicesFields: React.FC = () => {
    const [choiceLabel, setChoiceLabel] = useState('')

    function addChoice() {
      setChoices([...choices, choiceLabel])
    }

    function removeChoice(idx) {
      const currentChoices = [...choices]
      currentChoices.splice(idx, 1)
      setChoices(currentChoices)
    }

    return (
      <fieldset>
        <ul>
          {choices.map((choice, idx) => (
            <li key={idx}>
              {choice}
              <a onClick={e => removeChoice(idx)}>Delete</a>
            </li>
          ))}
        </ul>
        <input
          placeholder="Choice label"
          value={choiceLabel}
          onChange={e => setChoiceLabel(e.target.value)}
        />
        <button onClick={addChoice}>Add choice</button>
      </fieldset>
    )
  }

  const OptionFields: React.FC<OptionsFieldsProps> = ({
    type
  }: OptionsFieldsProps) => {
    switch (type) {
      case 'true or false':
        return <TrueFalseFields />
      case 'choices':
        return <ChoicesFields />
      case 'multiple choices':
        return <ChoicesFields />
      default:
        return <p>Choose a question type</p>
    }
  }

  return (
    <>
      <Header />
      <Container>
        <h1>Admin Dashboard</h1>
        <Content>
          <h2>Create new question</h2>
          <StyledForm onSubmit={handleNewQuestion} ref={formRef}>
            <Input placeholder="Question title" name="name" />
            <Input placeholder="Description" name="description" />
            <Select
              name="type"
              options={options}
              onChange={e => setType(e.value)}
            />
            <OptionFields type={type} />
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
        <Content>
          <h2>Users</h2>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>User name</th>
                <th>User email</th>
                <th>View questions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id}>
                  {user.name}
                  <td>{idx}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/users/${user.id}/answers`}>View questions</Link>
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
