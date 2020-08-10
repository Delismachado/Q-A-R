import React, { useCallback, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

// import {  } from './style'

import Header from '../../components/Header'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

interface UserAnswersResponse {
  id: string
  question: {
    name: string
  }
  value: boolean
}

const UserAnswers: React.FC = () => {
  const [answers, setAnswers] = useState<UserAnswersResponse[]>([])
  const { user_id } = useParams()
  const { token } = useAuth()

  useEffect(() => {
    api
      .get(`/answers/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setAnswers(response.data)
      })
  }, [token, user_id])

  return (
    <>
      <Header />
      <h1>User answers</h1>
      <ul>
        {answers.map(answer => (
          <li key={answer.id}>
            {answer.question.name} - {answer.value ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserAnswers
