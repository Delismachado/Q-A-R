import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  SimpleGrid,
  Text
} from '@chakra-ui/react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { AxiosResponse } from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../hooks/auth'
import api from '../../../services/api'
import LabeledInput from '../../../components/LabeledInput'
import LabeledSelect from '../../../components/LabeledSelect'
import CheckboxGroup from '../../../components/CheckboxGroup'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

interface QuestionData {
  id: string
  name: string
  type: string
  options: any
  factTypes: []
}

interface FactData {
  id: string
  name: string
  question: QuestionData
  type: string
}

interface FactOptionsFieldsetProps {
  type: string
  question: QuestionData
}

interface MatchOptions {
  freeText?: boolean
  options?: {
    label: string
    value: string
  }[]
  multiple?: boolean
}

const ChoiceMatchFactFields: React.FC<FactOptionsFieldsetProps> = ({
  type,
  question
}: FactOptionsFieldsetProps) => {
  const [options, setOptions] = useState<MatchOptions>({
    freeText: true,
    options: [],
    multiple: false
  })
  useEffect(() => {
    switch (question.type) {
      case 'TrueFalseQuestion':
        setOptions({
          options: [
            { label: question.options.trueLabel, value: 'true' },
            { label: question.options.falseLabel, value: 'false' }
          ],
          multiple: false
        })
        break
      case 'ChoicesQuestion':
        setOptions({
          options: question.options.choices.map(c => ({ label: c, value: c })),
          multiple: false
        })
        break
      case 'MultipleChoicesQuestion':
        setOptions({
          options: question.options.choices.map(c => ({ label: c, value: c })),
          multiple: true
        })
        break
      default:
        setOptions({ freeText: true })
    }
  }, [question])
  if (options.freeText) {
    return <LabeledInput label="Response text value" name="value" />
  } else if (options.options.length > 0 && !options.multiple) {
    return (
      <LabeledSelect
        label="Selected value"
        name="value"
        options={options.options}
      />
    )
  } else if (options.options.length > 0 && options.multiple) {
    return (
      <FormControl paddingTop="1rem">
        <FormLabel htmlFor="value">Selected values</FormLabel>
        <CheckboxGroup name="value" options={options.options} />
      </FormControl>
    )
  }
}

const FactOptionsFieldsByType: React.FC<FactOptionsFieldsetProps> = ({
  type,
  question
}: FactOptionsFieldsetProps) => {
  switch (type) {
    case 'ChoiceMatchFact':
      return <ChoiceMatchFactFields type={type} question={question} />
    default:
      return <p>Choose a fact type</p>
  }
}

const FactOptionsFieldset: React.FC<FactOptionsFieldsetProps> = ({
  type,
  question
}: FactOptionsFieldsetProps) => {
  return (
    <Box
      as="fieldset"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.800"
      mt="1rem"
      p="1rem"
    >
      <legend>Fact options:</legend>
      <FactOptionsFieldsByType type={type} question={question} />
    </Box>
  )
}

interface FactsBoxProps extends BoxProps {
  projectId: string
}

const FactsBox: React.FC<FactsBoxProps> = ({
  projectId,
  ...rest
}: FactsBoxProps) => {
  const { user } = useAuth()
  const [facts, setFacts] = useState<FactData[]>([])
  const [editingFact, setEditingFact] = useState<FactData>(null)

  useEffect(() => {
    api.get(`/projects/${projectId}/facts`).then(response => {
      setFacts(response.data)
    })
  }, [user, projectId])

  const formRef = useRef<FormHandles>(null)

  const handleSaveFact = useCallback(
    (fact: FactData) => {
      if (editingFact) {
        api.put(`/facts/${editingFact.id}`, fact).then(q => {
          const newFacts = facts.map(fa =>
            fa.id === editingFact.id ? q.data : fa
          )
          setFacts(newFacts)
          setEditingFact(null)
        })
      } else {
        api.post('/facts', fact).then((ret: AxiosResponse<FactData>) => {
          setFacts([...facts, ret.data])
        })
      }
      formRef.current.reset()
    },
    [editingFact, projectId, facts]
  )

  const handleRemoveFact = (fact: FactData) => {
    api.delete(`/facts/${fact.id}`).then(() => {
      setFacts(facts.filter(p => p.id !== fact.id))
    })
  }

  const handleEditFact = (fact: FactData) => {
    setEditingFact(fact)
    formRef.current.setData(fact)
    setTypes(fact.question.factTypes)
  }

  const [questions, setQuestions] = useState<QuestionData[]>([])
  useEffect(() => {
    api
      .get(`/projects/${projectId}/questions`)
      .then(response => response.data)
      .then(setQuestions)
  }, [user, projectId])

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionData>(null)
  const [types, setTypes] = useState<string[]>([])

  const selectQuestion = useCallback(
    questionId => {
      const question = questions.find(q => q.id === questionId)
      if (question) {
        setSelectedQuestion(question)
        setTypes(question.factTypes)
      } else {
        setTypes([])
      }
    },
    [questions, user]
  )

  const [selectedType, setSelectedType] = useState<string>(null)

  return (
    <Box maxWidth="6xl" margin="auto" {...rest}>
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
          <Heading as="h3" size="lg">
            Create new fact
          </Heading>
          <Form onSubmit={handleSaveFact} ref={formRef}>
            <LabeledInput
              label="Fact name"
              placeholder="Fact description"
              name="name"
            />
            <LabeledSelect
              placeholder="Select a question"
              label="Question"
              options={questions.map(q => ({ label: q.name, value: q.id }))}
              name="questionId"
              onChange={e => selectQuestion(e.target.value)}
            />
            <LabeledSelect
              placeholder="Select a fact type"
              label="Fact type"
              options={types.map(t => ({ label: t, value: t }))}
              name="type"
              onChange={e => setSelectedType(e.target.value)}
            />
            <FactOptionsFieldset
              type={selectedType}
              question={selectedQuestion}
            />
            <ButtonGroup mt="1rem">
              <Button
                className="button"
                type="reset"
                onClick={() => setEditingFact(null)}
              >
                Reset
              </Button>
              <Button className="button" type="submit" colorScheme="green">
                {editingFact ? 'Update fact' : 'Create new fact'}
              </Button>
            </ButtonGroup>
          </Form>
        </Box>
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
          <Heading as="h3" size="lg">
            Facts list
          </Heading>
          {facts.map(fact => (
            <Flex
              key={fact.id}
              border="1px"
              borderColor="gray.500"
              borderRadius="lg"
              padding=".5rem"
              marginY=".5rem"
              verticalAlign="middle"
            >
              <Text>
                <strong>{fact.name}</strong>
              </Text>
              <ButtonGroup marginLeft="auto">
                <IconButton
                  aria-label="Remove fact"
                  title="Remove fact"
                  icon={<DeleteIcon />}
                  onClick={() => handleRemoveFact(fact)}
                />
                <IconButton
                  aria-label="Edit fact"
                  title="Edit fact"
                  icon={<EditIcon />}
                  onClick={() => handleEditFact(fact)}
                />
              </ButtonGroup>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default FactsBox
