import React, { useCallback, useEffect, useState } from 'react'
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

interface RuleData {
  id: string
  type: string
  label: string
  operands: RuleData[] | null
  factId?: string
}

interface RulesBoxProps extends BoxProps {
  projectId: string
}

const RulesBox: React.FC<RulesBoxProps> = ({
  projectId,
  ...rest
}: RulesBoxProps) => {
  const [rules, setRules] = useState<RuleData[]>([])

  useEffect(() => {
    api.get(`/projects/${projectId}/rules`).then(res => setRules(res.data))
  }, [projectId])

  const handleNewRule = useCallback(
    data => {
      data.projectId = projectId
      api
        .post('/rules', data)
        .then(res => {
          setRules([...rules, res.data])
        })
        .catch(res => {
          console.log(res)
          alert('Error creating new rule')
        })
    },
    [projectId]
  )

  return (
    <Box maxWidth="6xl" margin="auto" {...rest}>
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.200">
          <Heading as="h3" size="lg">
            Create new rule
          </Heading>
          <Form onSubmit={handleNewRule}>
            <ButtonGroup mt="1rem">
              <Button className="button" type="reset">
                Reset
              </Button>
              <Button className="button" type="submit" variantColor="green">
                Create new rule
              </Button>
            </ButtonGroup>
          </Form>
        </Box>
        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.200">
          <Heading as="h3" size="lg">
            Rules list
          </Heading>
          {rules.map(rule => (
            <Flex
              key={rule.id}
              border="1px"
              borderColor="gray.500"
              borderRadius="lg"
              padding=".5rem"
              marginY=".5rem"
              verticalAlign="middle"
            >
              <Text>
                <strong>{rule.label}</strong>
              </Text>
              <ButtonGroup marginLeft="auto">
                <IconButton
                  isDisabled={true}
                  aria-label="Remove rule"
                  title="Remove rule"
                  icon="delete"
                />
                <IconButton
                  isDisabled={true}
                  aria-label="Edit rule"
                  title="Edit rule"
                  icon="edit"
                />
              </ButtonGroup>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default RulesBox
