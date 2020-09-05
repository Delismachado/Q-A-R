import React, { useState, useEffect, useRef } from 'react'

import { Table } from './style'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import LabeledInput from '../../components/LabeledInput'
import Select, { OptionType } from '../../components/Select'
import Textarea from '../../components/Textarea'
import { FormHandles, useField } from '@unform/core'
import {
  Box,
  Heading,
  Flex,
  FormControl,
  IconButton,
  SimpleGrid,
  FormLabel,
  InputGroup,
  InputRightElement,
  Stack
} from '@chakra-ui/core'
import { Form } from '@unform/web'

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

  const { fieldName, registerField } = useField('options.choices')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => choices
    })
  }, [fieldName, registerField, choices])

  return (
    <FormControl paddingTop="2rem" as="fieldset">
      <Stack>
        {choices.map((choice, idx) => (
          <Flex
            key={idx}
            width="100%"
            borderWidth="1px"
            borderRadius="lg"
            borderColor="gray.500"
          >
            {choice}
            <IconButton
              marginLeft="auto"
              title="Remove choice"
              aria-label="delete"
              icon="small-close"
              onClick={e => removeChoice(idx)}
            />
          </Flex>
        ))}
      </Stack>
      <FormControl>
        <FormLabel>Choice label</FormLabel>
        <InputGroup>
          <Input
            placeholder="Another option"
            name="choiceLabel"
            onChange={e => setChoiceLabel(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              title="Add choice"
              aria-label="Add choice"
              icon="plus-square"
              type="button"
              onClick={addChoice}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
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
    api.get('/questions').then(response => {
      setQuestions(response.data)
    })
  }, [user])

  useEffect(() => {
    api.get('/users').then(response => {
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
    <Box maxWidth="6xl" margin="auto">
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.700">
          <Heading as="h3" size="lg">
            Create new question
          </Heading>
          <Form onSubmit={handleNewQuestion} ref={formRef}>
            <LabeledInput
              label="Question title"
              placeholder="How are you?"
              name="name"
            />
            <Textarea
              label="Question Description"
              placeholder="Describe your question here"
              name="description"
            />
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

        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.700">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>List of questions</th>
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
        {/* <Box d="row" mt="1" alignItems="center">
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
          </Box> */}
      </SimpleGrid>
    </Box>
  )
}

export default AdminDashboard
