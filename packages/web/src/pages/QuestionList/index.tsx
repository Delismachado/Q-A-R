import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Container, Content } from './style'


export default function NewQuestion() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const history = useHistory()

  async function handleNewQuestion(e) {
    e.preventDefault()

    try {
      const data = {
        title,
        description
      }
    } catch (err) {
      alert('Erro ao cadastrar o nova pergunta!')
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
                Descreva a pergunta detalhadamente para encontrar uma boa resposta.
              </p>

              <Link className="back-link" to="/admin-dashboard">
                Voltar para home
              </Link>
            </section>
            <form onSubmit={handleNewQuestion}>
              <input
                placeholder="Título da pergunta"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </form>
            <button className="button" type="submit">
                Cadastrar
            </button>
          </div>
        </div>
      </Content>
    </Container>
  )
}
