import React, { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// import {  } from './style'

import Header from '../../components/Header'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/auth'

const UserAnswers: React.FC = () => {
  const [answers, setAnswers] = useState([])

  return (
    <>
      <Header />
      <h1>User answers</h1>
      <ul>
        {answers.map(answer => (
          <li key={answer.id}>
            {answer.question.title}: {answer.value}
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserAnswers
