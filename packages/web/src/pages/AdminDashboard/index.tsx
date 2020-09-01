import React, { useState, useEffect, useRef, useCallback } from 'react'

import { Container, Content, StyledForm, Table } from './style'

import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import Select, { OptionType } from '../../components/Select'
import { FormHandles, useField } from '@unform/core'
import {
  Box,
  Heading,
  Flex,
  Button,
  FormControl,
  List,
  ListItem,
  IconButton,
  Textarea
} from '@chakra-ui/core'
import { Form } from '@unform/web'
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
    <FormControl as="fieldset">
      <Input
        label="True value label"
        placeholder="Yes!"
        name="options.trueLabel"
      />
      <Input
        label="False value label"
        placeholder="No."
        name="options.falseLabel"
      />
    </FormControl>
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

  const { fieldName, defaultValue, error, registerField } = useField(
    'options.choices'
  )

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => choices
    })
  }, [fieldName, registerField, choices])

  return (
    <FormControl as="fieldset">
      <List styleType="disc">
        {choices.map((choice, idx) => (
          <ListItem key={idx}>
            {choice}
            <IconButton
              title="Remove choice"
              aria-label="delete"
              icon="small-close"
              onClick={e => removeChoice(idx)}
            />
          </ListItem>
        ))}
      </List>
      <Input
        label="Choice label"
        placeholder="Another option"
        name="choiceLabel"
        onChange={e => setChoiceLabel(e.target.value)}
      />
      <Button type="button" onClick={addChoice}>
        Add choice
      </Button>
    </FormControl>
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

  const optionsTypes: OptionType[] = [
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

  const handleNewQuestion = (data: CreateQuestionData, helper, event): void => {
    event.preventDefault()
    console.log(data)
    /*

    data.options = options
    api.post('/questions', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) */
  }

  const formRef = useRef<FormHandles>(null)
  const [type, setType] = useState<string>('')
  const [options, setOptions] = useState({})

  return (
    <Flex direction="column" alignItems="center">
      <Box>
        <Heading as="h3" size="lg">
          Create new question
        </Heading>
        <Form onSubmit={handleNewQuestion} ref={formRef}>
          <Input
            size="lg"
            label="Question title"
            placeholder="How are you?"
            name="name"
          />
          <Textarea size="sm" placeholder="Describe your question here" />
          <Select
            label="Question type"
            name="type"
            options={optionsTypes}
            onChange={e => setType(e.target.value)}
          />
          <OptionFields type={type} onOptionsChange={e => console.log(e)} />
          <Button className="button" type="submit" variantColor="green">
            Create question
          </Button>
        </Form>
      </Box>
      <Flex direction="row">
        <Box as="span" color="black" fontSize="sm">
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
        </Box>
        <Box d="row" mt="1" alignItems="center">
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
        </Box>
      </Flex>
    </Flex>
  )
}

export default AdminDashboard
