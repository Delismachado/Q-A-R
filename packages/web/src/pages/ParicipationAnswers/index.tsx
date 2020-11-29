import React, { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'

import api from '../../services/api'

import { Form } from '@unform/web'
import {
  Box,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Stack
} from '@chakra-ui/react'

import RadioGroup, { RadioGroupOptions } from '../../components/RadioGroup'
import CheckboxGroup, {
  CheckboxGroupOptions
} from '../../components/CheckboxGroup'
import LabeledSelect, { OptionType } from '../../components/LabeledSelect'
import Input from '../../components/Input'
import { ArrowLeftIcon, CheckIcon } from '@chakra-ui/icons'

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
      <RadioGroup name="values" options={trueFalseOptions} />
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
      <CheckboxGroup options={checkBoxOptions} name="values" />
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

interface RecommendationData {
  id: string
  name: string
  description: string
}

interface QuestionData {
  id: string
  name: string
  description: string
  type: string
  options: any
}

interface ShowRecommendationProps {
  recommendation: RecommendationData
}

const ShowRecommendation: React.FC<ShowRecommendationProps> = ({
  recommendation
}: ShowRecommendationProps) => {
  return (
    <Stack>
      <Heading>{recommendation.name}</Heading>
      <Text>{recommendation.description}</Text>
    </Stack>
  )
}

interface ParamsData {
  questionId: string
  participationId: string
}

const ParticipationAnswers: React.FC = () => {
  const { participationId } = useParams<ParamsData>()
  const [question, setQuestion] = useState<QuestionData>({
    id: '',
    name: 'Loading...',
    description: '',
    type: null,
    options: {}
  })
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(true)
  const [recommendation, setRecommendation] = useState<RecommendationData>(null)

  const handleNextQuestion = useCallback(() => {
    setLoadingQuestion(true)
    api
      .get(`/participations/${participationId}/nextQuestion`)
      .catch(e => alert('Error loading next question.'))
      .then(response => {
        if (response.data.type === 'Question') {
          setQuestion(response.data.question as QuestionData)
          setLoadingQuestion(false)
        } else if (response.data.type === 'Recommendation') {
          setRecommendation(response.data.recommendation)
        }
      })
  }, [participationId])

  useEffect(handleNextQuestion, [participationId])

  const handleSubmit = useCallback(
    data => {
      data.questionId = question.id
      data.participationId = participationId
      api
        .post('/answers', data)
        .catch(() => alert('Error saving your answer.'))
        .then(handleNextQuestion)
    },
    [participationId, question]
  )

  let content = null
  if (recommendation === null) {
    content = (
      <>
        <Heading size="lg" textAlign="center" paddingBottom="2rem">
          {question.name}
        </Heading>
        <Text paddingBottom="2rem">{question.description}</Text>
        <Form onSubmit={handleSubmit}>
          <AnswerField question={question} />
          <ButtonGroup display="flex" paddingTop="2rem">
            <Box flex="1">
              <Link to={`/my-projects/${participationId}`}>
                <Button leftIcon={<ArrowLeftIcon />}>Go back</Button>
              </Link>
            </Box>
            <Button
              type="submit"
              colorScheme="teal"
              disabled={loadingQuestion}
              leftIcon={<CheckIcon />}
            >
              Register answer
            </Button>
          </ButtonGroup>
        </Form>
      </>
    )
  } else {
    content = <ShowRecommendation recommendation={recommendation} />
  }

  return (
    <Box maxWidth="3xl" margin="auto">
      <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
        {content}
      </Box>
    </Box>
  )
}

export default ParticipationAnswers
