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

const TrueFalseFields: React.FC = () => {
  return (
    <FormControl>
      <LabeledInput
        label="True value label"
        placeholder="Yes!"
        name="options.trueLabel"
      />
      <LabeledInput
        label="False value label"
        placeholder="No."
        name="options.falseLabel"
      />
    </FormControl>
  )
}

const ChoicesFields: React.FC = () => {
  const [choices, setChoices] = useState([])

  const { fieldName, registerField } = useField('options.choices')
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => choices
    })
  }, [fieldName, registerField, choices])

  const [choiceLabel, setChoiceLabel] = useState('')

  function addChoice() {
    props.onOptionsChange({ choices: [...choices, choiceLabel] })
    setChoices([...choices, choiceLabel])
  }

  function removeChoice(idx) {
    const currentChoices = [...choices]
    currentChoices.splice(idx, 1)
    setChoices(currentChoices)
  }

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
}

const OptionsFieldsByType: React.FC<OptionsFieldsProps> = ({
  type
}: OptionsFieldsProps) => {
  switch (type) {
    case 'true or false':
      return <TrueFalseFields />
    case 'choices':
    case 'multiple choices':
      return <ChoicesFields />
    default:
      return <p>Choose a question type</p>
  }
}

const OptionFields: React.FC<OptionsFieldsProps> = ({
  type
}: OptionsFieldsProps) => {
  return (
    <Box
      as="fieldset"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.800"
      mt="1rem"
      p="1rem"
    >
      <legend>Question options:</legend>
      <OptionsFieldsByType type={type} />
    </Box>
  )
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])

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

  return (
    <Box maxWidth="6xl" margin="auto">
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.200">
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
            <OptionFields type={type} />
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
