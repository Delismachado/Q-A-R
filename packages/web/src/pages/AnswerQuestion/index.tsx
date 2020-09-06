import React, { useEffect, useState } from 'react'
import {
  Link,
  useParams,
  RouteComponentProps,
  useRouteMatch
} from 'react-router-dom'
import { Form } from '@unform/web'

import api from '../../services/api'

import { useAuth } from '../../hooks/auth'

import Select from '../../components/Select'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Container from '../../components/Container'
import Content from '../../components/Content'

import { StyledForm } from './style'

interface ChangeValuesFunc {
  (values: any): void
}

interface TrueOrFalseAnswerFieldsetProps {
  onChangeValues: ChangeValuesFunc
  options: any
}

const TrueOrFalseAnswerFieldset: React.FC<TrueOrFalseAnswerFieldsetProps> = ({
  onChangeValues,
  options
}: TrueOrFalseAnswerFieldsetProps) => {
  return (
    <fieldset>
      <input
        type="radio"
        value="true"
        id="trueValue"
        onChange={e => onChangeValues(e.target.value)}
        name="answer"
      />{' '}
      <label htmlFor="trueValue">{options.trueLabel}</label>
      <input
        type="radio"
        value="false"
        onChange={e => onChangeValues(e.target.value)}
        name="answer"
      />
      <label htmlFor="falseValue">{options.falseLabel}</label>
    </fieldset>
  )
}

interface ChoicesAnswerFieldsetProps {
  onChangeValues: ChangeValuesFunc
  options: any
}

const ChoicesAnswerFieldset: React.FC<ChoicesAnswerFieldsetProps> = ({
  onChangeValues,
  options
}: ChoicesAnswerFieldsetProps) => {
  return (
    <fieldset>
      <select onChange={e => onChangeValues(e.target.value)}>
        {options.choices.map((c: string) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </fieldset>
  )
}

interface MultipleChoicesAnswerFieldsetProps {
  onChangeValues: ChangeValuesFunc
  options: any
}

const MultipleChoicesAnswerFieldset: React.FC<MultipleChoicesAnswerFieldsetProps> = ({
  onChangeValues,
  options
}: MultipleChoicesAnswerFieldsetProps) => {
  const [selectedState, setSelectedState] = useState([])

  function handleChange(checked, value) {
    const selected = selectedState
    console.log(checked)
    if (checked) {
      selected.push(value)
    } else {
      selected.splice(selected.indexOf(value), 1)
    }
    onChangeValues(selected)
    setSelectedState(selected)
  }

  return (
    <fieldset>
      {options.choices.map((c: string) => (
        <label key={c} className="form-check-label">
          <input
            type="checkbox"
            onChange={e => handleChange(e.target.checked, c)}
            className="form-check-input"
          />
          {c}
        </label>
      ))}
    </fieldset>
  )
}

interface AnswerFieldProps {
  question: QuestionData
  onChangeValues: ChangeValuesFunc
}

const AnswerField: React.FC<AnswerFieldProps> = ({
  question,
  onChangeValues
}: AnswerFieldProps) => {
  switch (question.type) {
    case 'true or false':
      return (
        <TrueOrFalseAnswerFieldset
          options={question.options}
          onChangeValues={onChangeValues}
        />
      )
    case 'choices':
      return (
        <ChoicesAnswerFieldset
          options={question.options}
          onChangeValues={onChangeValues}
        />
      )
    case 'multiple choices':
      return (
        <MultipleChoicesAnswerFieldset
          options={question.options}
          onChangeValues={onChangeValues}
        />
      )
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

const AnswerQuestion: React.FC = () => {
  const [question, setQuestion] = useState<QuestionData>({
    name: 'Loading...',
    description: '',
    type: null,
    options: {}
  })

  const { question_id } = useParams()
  useEffect(() => {
    api
      .get(`/questions/${question_id}`)
      .then(response => setQuestion(response.data as QuestionData))
  }, [question_id])

  const { user } = useAuth()

  const [values, setValues] = useState({})

  const handleSubmit = () => {
    api.post(`/users/${user.id}/answers`, {
      values: values,
      question_id: question_id
    })
  }

  return (
    <>
      <Container>
        <Content>
          <h1>{question.name}</h1>
          <p>{question.description}</p>
          <StyledForm onSubmit={handleSubmit}>
            <AnswerField
              question={question}
              onChangeValues={e => setValues(e)}
            />
            <Button type="submit">Register</Button>
            <Link to="/user-dashboard">Go back</Link>
          </StyledForm>
        </Content>
      </Container>
    </>
  )
}

export default AnswerQuestion
