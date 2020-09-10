import React, { useEffect, useState } from 'react'
import { Table } from './style'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
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

// import Container from '../../components/Container'
// import Content from '../../components/Content'

const UserDashboard: React.FC = () => {
  const { user, token } = useAuth()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    api
      .get('/questions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setQuestions(response.data)
      })
  }, [user])

  return (
    <>
      <Box m="1rem" p="1rem" borderRadius="md" backgroundColor="gray.200">
        <Heading as="h3" size="lg">
          Questions list
        </Heading>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answers</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {questions.map((question, idx) => (
              <tr key={question.id}>
                <td>{idx + 1}</td>
                <td>{question.name}</td>
                <td>
                  <Link to={`/questions/${question.id}`}>Answer</Link>
                </td>
                <td></td>
              </tr>
            ))} */}
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
                <Link to={`/questions/${question.id}`}>Answer</Link>
              </Flex>
            ))}
          </tbody>
        </Table>
      </Box>
    </>
  )
}

export default UserDashboard
