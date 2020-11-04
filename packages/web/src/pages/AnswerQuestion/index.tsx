import React, { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'

import api from '../../services/api'

import { useAuth } from '../../hooks/auth'

import { Form } from '@unform/web'
import { Box, Heading, Text, Button, ButtonGroup } from '@chakra-ui/core'

import RadioGroup, { RadioGroupOptions } from '../../components/RadioGroup'
import CheckboxGroup, {
  CheckboxGroupOptions
} from '../../components/CheckboxGroup'
import LabeledSelect, { OptionType } from '../../components/LabeledSelect'
import Input from '../../components/Input'

interface ChangeValuesFunc {
  (values: any): void
}

interface TrueOrFalseAnswerFieldsetProps {
  options: any
}

const TrueOrFalseAnswerFieldset: React.FC<TrueOrFalseAnswerFieldsetProps> = ({
  options
}: TrueOrFalseAnswerFieldsetProps) => {
  const trueFalseOptions: RadioGroupOptions[] = [
    { label: options.trueLabel, value: 'true' },
    { label: options.falseLabel, value: 'false' }
  ]
  return (
    <fieldset>
      <RadioGroup name="values" isInline options={trueFalseOptions} />
    </fieldset>
  )
}

interface ChoicesAnswerFieldsetProps {
  options: any
}

const ChoicesAnswerFieldset: React.FC<ChoicesAnswerFieldsetProps> = ({
  options
}: ChoicesAnswerFieldsetProps) => {
  const choicesOptions: OptionType[] = options.choices.map(c => ({
    label: c,
    value: c
  }))

  return (
    <fieldset>
      <LabeledSelect options={choicesOptions} name="values" />
    </fieldset>
  )
}

interface MultipleChoicesAnswerFieldsetProps {
  options: any
}

const MultipleChoicesAnswerFieldset: React.FC<MultipleChoicesAnswerFieldsetProps> = ({
  options
}: MultipleChoicesAnswerFieldsetProps) => {
  const checkBoxOptions: CheckboxGroupOptions[] = options.choices.map(o => ({
    label: o,
    value: o
  }))

  return (
    <fieldset>
      <CheckboxGroup
        variantColor="green"
        options={checkBoxOptions}
        name="values"
      />
    </fieldset>
  )
}

interface NumericAnswerFieldsetProps {
  options: any
}

const NumericAnswerFieldset: React.FC<NumericAnswerFieldsetProps> = ({
  options
}: NumericAnswerFieldsetProps) => {
  return (
    <fieldset>
      <Input type="number" name="values" />
    </fieldset>
  )
}

interface AnswerFieldProps {
  question: QuestionData
}

const AnswerField: React.FC<AnswerFieldProps> = ({
  question
}: AnswerFieldProps) => {
  switch (question.type) {
    case 'TrueFalseQuestion':
      return <TrueOrFalseAnswerFieldset options={question.options} />
    case 'ChoicesQuestion':
      return <ChoicesAnswerFieldset options={question.options} />
    case 'MultipleChoicesQuestion':
      return <MultipleChoicesAnswerFieldset options={question.options} />
    case 'NumericQuestion':
      return <NumericAnswerFieldset options={question.options} />
    default:
      return <p>Carregando ...</p>
  }
}

interface QuestionData {
  name: string
  description: string
  type: string
  options: any
}

interface ParamsData {
  questionId: string
  participationId: string
}

const AnswerQuestion: React.FC = () => {
  const { user } = useAuth()

  const [question, setQuestion] = useState<QuestionData>({
    name: 'Loading...',
    description: '',
    type: null,
    options: {}
  })

  const { questionId, participationId } = useParams<ParamsData>()
  useEffect(() => {
    api
      .get(`/questions/${questionId}`)
      .then(response => setQuestion(response.data as QuestionData))
  }, [questionId])

  const handleSubmit = useCallback(
    data => {
      data.questionId = questionId
      api.post(`/users/${user.id}/answers`, data)
    },
    [user, questionId]
  )

  return (
    <Box maxWidth="3xl" margin="auto">
      <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
        <Heading size="lg" textAlign="center" paddingBottom="2rem">
          {question.name}
        </Heading>
        <Text paddingBottom="2rem">{question.description}</Text>
        <Form onSubmit={handleSubmit}>
          <AnswerField question={question} />
          <ButtonGroup display="flex" paddingTop="2rem">
            <Box flex="1">
              <Link to={`/my-projects/${participationId}`}>
                <Button leftIcon="arrow-back">Go back</Button>
              </Link>
            </Box>
            <Button
              flex="1"
              type="submit"
              variantColor="green"
              leftIcon="check"
            >
              Register answer
            </Button>
          </ButtonGroup>
        </Form>
      </Box>
    </Box>
  )
}

export default AnswerQuestion
