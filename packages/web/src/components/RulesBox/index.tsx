import React, { useCallback, useEffect, useState } from 'react'
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
} from '@chakra-ui/core'
import { Form } from '@unform/web'
import RadioGroup from '../../components/RadioGroup'
import api from '../../services/api'

interface RuleData {
  id?: string
  type?: string
  label?: string
  operands: RuleData[] | null
  factId?: string
}

interface FactsData {
  id: string
  name: string
}

interface RuleFieldsProps extends BoxProps {
  baseName: string
}

const RuleFields: React.FC<RuleFieldsProps> = ({
  baseName,
  ...rest
}: RuleFieldsProps) => {
  const ruleTypes = [
    { label: 'AND', value: 'AndRule' },
    { label: 'OR', value: 'OrRule' },
    { label: 'NOT', value: 'NotRule' },
    { label: 'FACT', value: 'FactRule' }
  ]

  const [selectedType, setSelectedType] = useState<string>()
  const [noOperands, setNoOperands] = useState<number>(0)

  return (
    <Box
      margin="auto"
      p="1rem"
      borderRadius="lg"
      backgroundColor="gray.100"
      {...rest}
    >
      <Box>
        <FormControl>
          <FormLabel>Rule type:</FormLabel>
          <RadioGroup
            options={ruleTypes}
            name={baseName + '.type'}
            isInline
            onChange={e => {
              setSelectedType(e.target.value)
              setNoOperands(
                e.target.value === 'FactRule' ? 0 : Math.max(1, noOperands)
              )
            }}
          />
        </FormControl>
      </Box>
      {['AndRule', 'OrRule', 'NotRule'].includes(selectedType) && (
        <FormControl>
          <FormLabel>Rule operands:</FormLabel>
          {Array.from(Array(noOperands), (e, i) => (
            <RuleFields baseName={baseName + '.operands[' + i + ']'} />
          ))}
          {['AndRule', 'OrRule', 'NotRule'].includes(selectedType) && (
            <Button
              leftIcon="plus-square"
              onClick={() => setNoOperands(noOperands + 1)}
            >
              Operand
            </Button>
          )}
        </FormControl>
      )}
      {selectedType === 'FactRule' && <p>Fact rule</p>}
    </Box>
  )
}

interface RulesBoxProps extends BoxProps {
  projectId: string
}

const RulesBox: React.FC<RulesBoxProps> = ({
  projectId,
  ...rest
}: RulesBoxProps) => {
  const [rules, setRules] = useState<RuleData[]>([])
  const [facts, setFacts] = useState<FactsData[]>([])

  useEffect(() => {
    api.get(`/projects/${projectId}/rules`).then(res => setRules(res.data))
  }, [projectId])

  const handleNewRule = useCallback(
    (data, err, ev) => {
      // console.log(data)
      data.rule.projectId = projectId
      api
        .post('/rules', data.rule)
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
            <RuleFields baseName="rule" />
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
