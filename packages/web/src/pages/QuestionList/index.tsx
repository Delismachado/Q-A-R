import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Container, Content } from './style'

import api from '../../services/api'
// import { response } from 'express'

const NewQuestion: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [questions, setQuestion] = useState([])
  const [users, setUsers] = useState([])
  const history = useHistory()

  useEffect(() => {
    api.get('/questions').then(response => {
      setQuestion(response.data)
    })
  }, [])

  function handleNewQuestion(e) {
    e.preventDefault()

    try {
      const data = {
        name,
        description,
        type
      }

      api.post('/questions', data)

      history.push('/question-list')
    } catch (err) {
      alert('Erro ao cadastrar o nova pergunta!')
      return false
    }
  }

  return (
    <Container>
      <Content>
        <div className="new-incident-container">
          <div className="content">
            <section>
              <h1>Cadastrar nova pergunta</h1>
              <p>
                Descreva a pergunta detalhadamente para encontrar uma boa
                resposta.
              </p>

              <Link className="back-link" to="/admin-dashboard">
                Voltar para home
              </Link>
            </section>
            <form onSubmit={handleNewQuestion}>
              <input
                placeholder="Título da pergunta"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                placeholder="Type"
                value={type}
                onChange={e => setType(e.target.value)}
              />
              <textarea
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <button className="button" type="submit">
                Cadastrar
              </button>
              <ul>
                {questions.map(question => (
                  <li key={question.id}>{question.name}</li>
                ))}
              </ul>
            </form>
            <h1>Users</h1>
            <ul>
              {users.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </Content>
    </Container>
  )
}

export default NewQuestion
