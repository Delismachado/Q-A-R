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
  options: any
}

interface OnOptionsChangeFunc {
  (options: any): void
}

interface OptionsFieldsetProps {
  onOptionsChange: OnOptionsChangeFunc
}

interface TrueFalseOptions {
  trueLabel: string
  falseLabel: string
}

const TrueFalseFields: React.FC<OptionsFieldsetProps> = (
  props: OptionsFieldsetProps
) => {
  const [options, setOptions] = useState<TrueFalseOptions>({
    trueLabel: '',
    falseLabel: ''
  })
  function changeOptions(options) {
    setOptions(options)
    props.onOptionsChange(options)
  }

  return (
    <fieldset>
      <input
        placeholder="True value label"
        value={options.trueLabel}
        onChange={e =>
          changeOptions({
            trueLabel: e.target.value,
            falseLabel: options.falseLabel
          })
        }
      />
      <input
        placeholder="False value label"
        value={options.falseLabel}
        onChange={e =>
          changeOptions({
            trueLabel: options.trueLabel,
            falseLabel: e.target.value
          })
        }
      />
    </fieldset>
  )
}

const ChoicesFields: React.FC<OptionsFieldsetProps> = (
  props: OptionsFieldsetProps
) => {
  const [choices, setChoices] = useState([])
  const [choiceLabel, setChoiceLabel] = useState('')

  function addChoice() {
    props.onOptionsChange({ choices: [...choices, choiceLabel] })
    setChoices([...choices, choiceLabel])
  }

  function removeChoice(idx) {
    const currentChoices = [...choices]
    currentChoices.splice(idx, 1)
    props.onOptionsChange({ choices: currentChoices })
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
      <button type="button" onClick={addChoice}>Add choice</button>
    </fieldset>
  )
}

interface OptionsFieldsProps {
  type: string
  onOptionsChange: OnOptionsChangeFunc
}

const OptionFields: React.FC<OptionsFieldsProps> = ({
  type,
  onOptionsChange
}: OptionsFieldsProps) => {
  switch (type) {
    case 'true or false':
      return <TrueFalseFields onOptionsChange={e => onOptionsChange(e)} />
    case 'choices':
    case 'multiple choices':
      return <ChoicesFields onOptionsChange={e => onOptionsChange(e)} />
    default:
      return <p>Choose a question type</p>
  }
}

const AdminDashboard: React.FC = () => {
  const { user, token } = useAuth()
  const [questions, setQuestions] = useState([])
  const [users, setUsers] = useState([])

  const optionsTypes: OptionType = [
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
    data.options = options
    api.post('/questions', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  const formRef = useRef<FormHandles>(null)
  const [type, setType] = useState<string>('')
  const [options, setOptions] = useState({})

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
              options={optionsTypes}
              onChange={e => setType(e.value)}
            />
            <OptionFields type={type} onOptionsChange={e => setOptions(e)} />
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
