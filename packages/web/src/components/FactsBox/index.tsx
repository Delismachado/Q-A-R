import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Text
} from '@chakra-ui/core'
import { Form } from '@unform/web'
import api from '../../services/api'
import { AxiosResponse } from 'axios'
import { useAuth } from '../../hooks/auth'
import LabeledInput from '../LabeledInput'
import { FormHandles } from '@unform/core'

interface FactsBoxProps extends BoxProps {
  projectId: string
}

interface FactData {
  id: string
  name: string
  question: {
    id: string
    name: string
    type: string
    options: unknown
  }
}

const FactsBox: React.FC<FactsBoxProps> = ({
  projectId,
  ...rest
}: FactsBoxProps) => {
  const { user } = useAuth()
  const [facts, setFacts] = useState<FactData[]>([])
  const [editingFact, setEditingFact] = useState<FactData>(null)

  useEffect(() => {
    api.get(`/projects/${projectId}/facts`).then(response => {
      setFacts(response.data)
    })
  }, [user, projectId])

  const formRef = useRef<FormHandles>(null)

  const handleSaveFact = useCallback(
    (fact: FactData) => {
      if (editingFact) {
        api.put(`/facts/${editingFact.id}`, fact).then(q => {
          const newFacts = facts.map(fa =>
            fa.id === editingFact.id ? q.data : fa
          )
          setFacts(newFacts)
          setEditingFact(null)
        })
      } else {
        api.post('/facts', fact).then((ret: AxiosResponse<FactData>) => {
          setFacts([...facts, ret.data])
        })
      }
      formRef.current.reset()
    },
    [editingFact, projectId, facts]
  )

  const handleRemoveFact = (fact: FactData) => {
    api.delete(`/facts/${fact.id}`).then(() => {
      setFacts(facts.filter(p => p.id !== fact.id))
    })
  }

  const handleEditFact = (fact: FactData) => {
    setEditingFact(fact)
    formRef.current.setData(fact)
  }

  return (
    <Box maxWidth="6xl" margin="auto" {...rest}>
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.200">
          <Heading as="h3" size="lg">
            Create new fact
          </Heading>
          <Form onSubmit={handleSaveFact} ref={formRef}>
            <LabeledInput
              label="Fact name"
              placeholder="Fact description"
              name="name"
            />
            <ButtonGroup mt="1rem">
              <Button
                className="button"
                type="reset"
                onClick={() => setEditingFact(null)}
              >
                Reset
              </Button>
              <Button className="button" type="submit" variantColor="green">
                {editingFact ? 'Update fact' : 'Create new fact'}
              </Button>
            </ButtonGroup>
          </Form>
        </Box>
        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.200">
          <Heading as="h3" size="lg">
            Facts list
          </Heading>
          {facts.map(fact => (
            <Flex
              key={fact.id}
              border="1px"
              borderColor="gray.500"
              borderRadius="lg"
              padding=".5rem"
              marginY=".5rem"
              verticalAlign="middle"
            >
              <Text>
                <strong>{fact.name}</strong>
              </Text>
              <ButtonGroup marginLeft="auto">
                <IconButton
                  aria-label="Remove fact"
                  title="Remove fact"
                  icon="delete"
                  onClick={() => handleRemoveFact(fact)}
                />
                <IconButton
                  aria-label="Edit fact"
                  title="Edit fact"
                  icon="edit"
                  onClick={() => handleEditFact(fact)}
                />
              </ButtonGroup>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default FactsBox
