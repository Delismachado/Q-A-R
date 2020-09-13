import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import {
  Box,
  Heading,
  ButtonGroup,
  Button,
  Text,
  List,
  ListItem
} from '@chakra-ui/core'

const UserDashboard: React.FC = () => {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    api.get('/questions').then(response => {
      setQuestions(response.data)
    })
  }, [user])

  return (
    <Box maxWidth="6xl" margin="auto">
      <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.200">
        <Heading as="h2" size="lg" paddingBottom="1rem">
          Questions list
        </Heading>
        <List>
          {questions.map((question, idx) => (
            <ListItem
              display="flex"
              border="1px"
              borderColor="gray.700"
              borderRadius="lg"
              padding=".5rem"
              marginY=".5rem"
              key={question.id}
            >
              <Box>
                <Text as="strong">
                  {idx + 1}. {question.name}
                </Text>
                <Text as="p" color="gray.500">
                  {question.description}
                </Text>
              </Box>
              <ButtonGroup marginLeft="auto">
                <Link to={`/questions/${question.id}`}>
                  <Button variantColor="teal" leftIcon="plus-square">
                    Add answer
                  </Button>
                </Link>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default UserDashboard
