import React, { useCallback, useEffect, useRef, useState } from 'react'
import api from '../../../services/api'

import {
  Box,
  ButtonGroup,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Button,
  Text,
  IconButton,
  Flex,
  BoxProps,
  Stack
} from '@chakra-ui/react'
import { useAuth } from '../../../hooks/auth'
import { FormHandles } from '@unform/core'
import { AxiosResponse } from 'axios'
import LabeledInput from '../../../components/LabeledInput'
import { Form } from '@unform/web'
import { DeleteIcon } from '@chakra-ui/icons'
import Textarea from '../../../components/Textarea'
import LabeledSelect from '../../../components/LabeledSelect'

interface RulesData {
  id: string
  label: string
}

interface RecommendationData {
  id: string
  name: string
  description: string
  projectId: string
  ruleId: string
  rule: RulesData
}


interface RecommendationsBoxProps extends BoxProps {
  projectId: string
}

const RecommendationsBox: React.FC<RecommendationsBoxProps> = ({
  projectId,
  ...rest
}: RecommendationsBoxProps) => {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState<RecommendationData[]>(
    []
  )
  const [rules, setRules] = useState<RulesData[]>([])

  useEffect(() => {
    api.get(`/projects/${projectId}/recommendations`).then(response => {
      setRecommendations(response.data)
    })
  }, [user, projectId])

  useEffect(() => {
    api.get(`/projects/${projectId}/rules`).then(response => {
      setRules(response.data)
    })
  }, [user, projectId])

  const formRef = useRef<FormHandles>(null)

  const handleSaveRecommendation = useCallback(
    (recommendation: RecommendationData) => {
      recommendation.projectId = projectId
      api
        .post('/recommendations', recommendation)
        .then((ret: AxiosResponse<RecommendationData>) => {
          setRecommendations([...recommendations, ret.data])
        })
        .catch(() => alert('Error while saving the recommendation'))
      formRef.current.reset()
    },
    [projectId, recommendations]
  )

  const handleRemoveRecommendation = useCallback(
    (recommendation: RecommendationData) => {
      api.delete(`/recommendations/${recommendation.id}`).then(res => {
        setRecommendations(recommendations.filter(p => p.id !== res.data.id))
      })
    },
    [recommendations]
  )

  return (
    <Box maxWidth="6xl" margin="auto" {...rest}>
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
          <Heading as="h3" size="lg">
            Create new fact
          </Heading>
          <Form onSubmit={handleSaveRecommendation} ref={formRef}>
            <LabeledInput
              placeholder="Recommendation name/title"
              label="Name"
              name="name"
            />
            <Textarea
              placeholder="Recommendation description"
              label="Description"
              name="description"
            />
            <LabeledSelect
              label="Rule"
              name="ruleId"
              options={rules.map(r => ({ label: r.label, value: r.id }))}
            />
            <ButtonGroup mt="1rem">
              <Button className="button" type="reset">
                Reset
              </Button>
              <Button className="button" type="submit" colorScheme="teal">
                Save recommendation
              </Button>
            </ButtonGroup>
          </Form>
        </Box>
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
          <Heading as="h3" size="lg">
            Recommendations
          </Heading>
          {recommendations.map(recommendation => (
            <Flex
              key={recommendation.id}
              border="1px"
              borderColor="gray.500"
              borderRadius="lg"
              padding=".5rem"
              marginY=".5rem"
              verticalAlign="middle"
            >
              <Stack>
                <Heading size="sm">
                  <strong>{recommendation.name}</strong>
                </Heading>
                <Text>{recommendation.description}</Text>
                <Text>{recommendation.rule.label}</Text>
              </Stack>
              <ButtonGroup marginLeft="auto">
                <IconButton
                  aria-label="Remove recommendation"
                  title="Remove recommendation"
                  icon={<DeleteIcon />}
                  onClick={() => handleRemoveRecommendation(recommendation)}
                />
              </ButtonGroup>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default RecommendationsBox
