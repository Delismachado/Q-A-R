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

interface ParticipationData {
  id: string
  project: {
    id: string
    name: string
  }
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth()
  const [participations, setParticipations] = useState<ParticipationData[]>([])

  useEffect(() => {
    api.get(`/users/${user.id}/participations`).then(response => {
      setParticipations(response.data)
    })
  }, [user])

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
          My Projects
        </Heading>
        <List>
          {participations.map((participation, idx) => (
            <ListItem
              display="flex"
              border="1px"
              borderColor="gray.700"
              borderRadius="lg"
              padding=".5rem"
              marginY=".5rem"
              key={participation.id}
            >
              <Box>
                <Text as="strong">
                  {idx + 1}. Project: {participation.project.name}
                </Text>
              </Box>
              <ButtonGroup marginLeft="auto">
                <Link to={`/my-projects/${participation.id}`}>
                  <Button variantColor="teal" leftIcon="plus-square">
                    Select project
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
