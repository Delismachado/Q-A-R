import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../../../hooks/auth'
import api from '../../../services/api'
import Input from '../../../components/Input'
import LabeledInput from '../../../components/LabeledInput'
import Select, { OptionType } from '../../../components/LabeledSelect'
import Textarea from '../../../components/Textarea'
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
  Text,
  BoxProps
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  PlusSquareIcon
} from '@chakra-ui/icons'

interface CreateQuestionData {
  id: string
  projectId: string
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
  const [choiceLabel, setChoiceLabel] = useState('')
  const { fieldName, registerField } = useField('options.choices')
  const choicesRef = useRef(choices)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: choicesRef,
      getValue: (ref: any) => {
        return ref.current
      },
      setValue: (ref, value) => {
        setChoices(value)
      }
    })
  }, [fieldName, registerField])

  useEffect(() => {
    choicesRef.current = choices
  }, [choices])

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
              icon={<CloseIcon />}
              onClick={() => removeChoice(idx)}
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
              icon={<PlusSquareIcon />}
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
    case 'TrueFalseQuestion':
      return <TrueFalseFields />
    case 'ChoicesQuestion':
    case 'MultipleChoicesQuestion':
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
  { value: 'TrueFalseQuestion', label: 'True or false' },
  { value: 'ChoicesQuestion', label: 'Choices' },
  { value: 'MultipleChoicesQuestion', label: 'Multiple choices' }
]

interface QuestionsBoxProps extends BoxProps {
  projectId: string
}

const QuestionsBox: React.FC<QuestionsBoxProps> = ({
  projectId,
  ...rest
}: QuestionsBoxProps) => {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])
  const [editingQuestion, setEditingQuestion] = useState(null)
  useEffect(() => {
    api.get(`/projects/${projectId}/questions`).then(response => {
      setQuestions(response.data)
    })
  }, [user, projectId])

  const formRef = useRef<FormHandles>(null)
  const [type, setType] = useState<string>('')

  const handleSaveQuestion = useCallback(
    (data: CreateQuestionData) => {
      data.projectId = projectId
      if (!editingQuestion) {
        api
          .post('/questions', data)
          .then(q => setQuestions([...questions, q.data]))
          .catch(err => {
            console.log(err)
            alert('Error creating the new question.')
          })
        formRef.current.reset()
      } else {
        api
          .put(`/questions/${editingQuestion.id}`, data)
          .then(response => {
            const newQuestions = [...questions]
            const idx = newQuestions.findIndex(q => q.id === editingQuestion.id)
            newQuestions[idx] = response.data
            setQuestions(newQuestions)
          })
          .catch(err => {
            console.log(err)
            alert('Error creating the new question.')
          })
      }
    },
    [formRef, projectId, editingQuestion]
  )

  const handleRemoveQuestion = useCallback(
    question => {
      api
        .delete(`/questions/${question.id}`)
        .then(() => setQuestions(questions.filter(q => q.id !== question.id)))
        .catch(err => {
          console.log(err)
          alert('Error removing the new question.')
        })
    },
    [questions]
  )

  const handleEditQuestion = useCallback(
    question => {
      setType(question.type)
      setEditingQuestion(question)
    },
    [questions]
  )

  useEffect(() => {
    if (editingQuestion) {
      formRef.current.setData(editingQuestion)
    }
  }, [editingQuestion, type])

  return (
    <Box maxWidth="6xl" margin="auto" {...rest}>
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
          <Heading as="h3" size="lg">
            Create new question
          </Heading>
          <Form onSubmit={handleSaveQuestion} ref={formRef}>
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
                colorScheme="orange"
                type="reset"
                onClick={() => setType('')}
              >
                Reset
              </Button>
              <Button className="button" type="submit" colorScheme="teal">
                Save
              </Button>
            </ButtonGroup>
          </Form>
        </Box>
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
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
                  onClick={() => handleRemoveQuestion(question)}
                  aria-label="Remove question"
                  title="Remove question"
                  icon={<DeleteIcon />}
                />
                <IconButton
                  onClick={() => handleEditQuestion(question)}
                  aria-label="Edit question"
                  title="Edit question"
                  icon={<EditIcon />}
                />
              </ButtonGroup>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default QuestionsBox
