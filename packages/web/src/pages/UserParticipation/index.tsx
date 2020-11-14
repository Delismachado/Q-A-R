import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link, useParams } from 'react-router-dom'
import {
  Box,
  Heading,
  ButtonGroup,
  Button,
  Text,
  List,
  ListItem
} from '@chakra-ui/core'

interface ProjectData {
  id: string
  name: string
}

interface QuestionData {
  id: string
  name: string
  description: string
}

interface ParamsData {
  participationId: string
}

const UserParticipation: React.FC = () => {
  const { user } = useAuth()
  const { participationId } = useParams<ParamsData>()

  const [project, setProject] = useState<ProjectData>(null)
  const [questions, setQuestions] = useState<QuestionData[]>([])

  useEffect(() => {
    api.get(`/participations/${participationId}`).then(response => {
      setProject(response.data.project)
    })
  }, [user])

  useEffect(() => {
    if (!project) {
      return
    }
    api.get(`/projects/${project.id}/questions`).then(response => {
      console.log(project.id)
      setQuestions(response.data)
    })
  }, [user, project])

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
                <Link
                  to={`/my-projects/${participationId}/questions/${question.id}`}
                >
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

export default UserParticipation