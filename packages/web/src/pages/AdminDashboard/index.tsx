import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import LabeledInput from '../../components/LabeledInput'
import Select, { OptionType } from '../../components/LabeledSelect'
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
  Stack,
  ButtonGroup,
  Button,
  Text
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
    <>
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
    </>
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
    setChoices([...choices, choiceLabel])
  }

  function removeChoice(idx) {
    const currentChoices = [...choices]
    currentChoices.splice(idx, 1)
    setChoices(currentChoices)
  }

  return (
    <>
      <Stack>
        {choices.map((choice, idx) => (
          <Flex
            key={idx}
            width="100%"
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.500"
            padding=".5rem"
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
      <FormControl paddingTop=".5rem">
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
    </>
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

const optionsTypes: OptionType[] = [
  { value: 'true or false', label: 'True or false' },
  { value: 'choices', label: 'Choices' },
  { value: 'multiple choices', label: 'Multiple choices' }
]

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    api.get('/questions').then(response => {
      setQuestions(response.data)
    })
  }, [user])

  const formRef = useRef<FormHandles>(null)
  const [type, setType] = useState<string>('')

  const handleNewQuestion = (data: CreateQuestionData) => {
    api.post('/questions', data).then(q => setQuestions([...questions, q.data]))
    formRef.current.reset()
  }

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
              placeholder="True/false, multiple choices, ..."
              onChange={e => setType(e.target.value)}
            />
            <OptionFields type={type} />
            <ButtonGroup mt="1rem">
              <Button
                className="button"
                type="reset"
                onClick={() => setType('')}
              >
                Reset
              </Button>
              <Button className="button" type="submit" variantColor="green">
                Create new question
              </Button>
            </ButtonGroup>
          </Form>
        </Box>
        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.200">
          <Heading as="h3" size="lg">
            Questions list
          </Heading>
          {questions.map(question => (
            <Flex
              key={question.id}
              border="1px"
              borderColor="gray.500"
              borderRadius="lg"
              padding=".5rem"
              marginY=".5rem"
              verticalAlign="middle"
            >
              <Text>
                <strong>{question.name}</strong>: {question.type}
              </Text>
              <ButtonGroup marginLeft="auto">
                <IconButton
                  isDisabled={true}
                  aria-label="Remove question"
                  title="Remove question"
                  icon="delete"
                />
                <IconButton
                  isDisabled={true}
                  aria-label="Edit question"
                  title="Edit question"
                  icon="edit"
                />
                <Link to={`/answers/${question.id}`}>
                  <IconButton
                    aria-label="View answers"
                    title="View answers"
                    icon="info"
                  />
                </Link>
              </ButtonGroup>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default AdminDashboard
