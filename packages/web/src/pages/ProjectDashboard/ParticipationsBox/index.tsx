import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  SimpleGrid,
  Text
} from '@chakra-ui/react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { AxiosResponse } from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../hooks/auth'
import api from '../../../services/api'
import LabeledInput from '../../../components/LabeledInput'
import LabeledSelect from '../../../components/LabeledSelect'
import CheckboxGroup from '../../../components/CheckboxGroup'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

interface UserData {
  id: string
  email: string
}

interface ParticipationData {
  id: string
  userId: string
  projectId: string
  user?: {
    email: string
  }
}

interface ParticipationsBoxProps extends BoxProps {
  projectId: string
}

const ParticipationsBox: React.FC<ParticipationsBoxProps> = ({
  projectId,
  ...rest
}: ParticipationsBoxProps) => {
  const { user } = useAuth()
  const [participations, setParticipations] = useState<ParticipationData[]>([])
  const [users, setUsers] = useState<UserData[]>([])

  useEffect(() => {
    api.get(`/projects/${projectId}/participations`).then(response => {
      setParticipations(response.data)
    })
  }, [user, projectId])

  useEffect(() => {
    api.get('/users?role=user').then(response => {
      setUsers(response.data)
    })
  }, [user])

  const formRef = useRef<FormHandles>(null)

  const handleSaveParticipation = useCallback(
    (participation: ParticipationData) => {
      participation.projectId = projectId
      api
        .post('/participations', participation)
        .then((ret: AxiosResponse<ParticipationData>) => {
          setParticipations([...participations, ret.data])
        })
        .catch(() => alert('Error while saving the participation'))
      formRef.current.reset()
    },
    [projectId, participations]
  )

  const handleRemoveParticipation = useCallback(
    (participation: ParticipationData) => {
      api.delete(`/participations/${participation.id}`).then(res => {
        setParticipations(participations.filter(p => p.id !== res.data.id))
      })
    },
    [participations]
  )

  return (
    <Box maxWidth="6xl" margin="auto" {...rest}>
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
          <Heading as="h3" size="lg">
            Create new fact
          </Heading>
          <Form onSubmit={handleSaveParticipation} ref={formRef}>
            <LabeledSelect
              placeholder="Select an user"
              label="User"
              options={users.map(u => ({ label: u.email, value: u.id }))}
              name="userId"
            />
            <ButtonGroup mt="1rem">
              <Button className="button" type="reset">
                Reset
              </Button>
              <Button className="button" type="submit" colorScheme="teal">
                Save participation
              </Button>
            </ButtonGroup>
          </Form>
        </Box>
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
          <Heading as="h3" size="lg">
            Participations
          </Heading>
          {participations.map(participation => (
            <Flex
              key={participation.id}
              border="1px"
              borderColor="gray.500"
              borderRadius="lg"
              padding=".5rem"
              marginY=".5rem"
              verticalAlign="middle"
            >
              <Text>
                <strong>{participation.user.email}</strong>
              </Text>
              <ButtonGroup marginLeft="auto">
                <IconButton
                  aria-label="Remove fact"
                  title="Remove fact"
                  icon={<DeleteIcon />}
                  onClick={() => handleRemoveParticipation(participation)}
                />
              </ButtonGroup>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default ParticipationsBox
