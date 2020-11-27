import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Badge,
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
import { Form } from '@unform/web'
import RadioGroup from '../../../components/RadioGroup'
import LabeledSelect from '../../../components/LabeledSelect'
import api from '../../../services/api'
import { FormHandles } from '@unform/core'
import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons'

interface FactsData {
  id: string
  name: string
}

interface RuleData {
  id?: string
  type?: string
  label?: string
  operands: RuleData[] | null
  factId?: string
  fact: FactsData
}

interface RuleLabelProps {
  rule: RuleData
}

const RuleLabel: React.FC<RuleLabelProps> = ({ rule }: RuleLabelProps) => {
  return (
    <span>
      {rule.type === 'FactRule' && (
        <Badge variantColor="green">{rule.label}</Badge>
      )}
      {rule.type === 'AndRule' &&
        rule.operands.map((r, idx) => (
          <span key={idx}>
            (<RuleLabel rule={r} />)
            {idx !== rule.operands.length - 1 && ' AND '}
          </span>
        ))}
      {rule.type === 'OrRule' &&
        rule.operands.map((r, idx) => (
          <span key={idx}>
            (<RuleLabel rule={r} />){idx !== rule.operands.length - 1 && ' OR '}
          </span>
        ))}
      {rule.type === 'NotRule' &&
        rule.operands.map((r, idx) => (
          <span key={idx}>
            NOT (<RuleLabel rule={r} />)
          </span>
        ))}
    </span>
  )
}

interface RuleFieldsProps extends BoxProps {
  baseName: string
  facts: FactsData[]
}

const RuleFields: React.FC<RuleFieldsProps> = ({
  baseName,
  facts,
  ...rest
}: RuleFieldsProps) => {
  const ruleTypes = [
    { label: 'AND', value: 'AndRule' },
    { label: 'OR', value: 'OrRule' },
    { label: 'NOT', value: 'NotRule' },
    { label: 'FACT', value: 'FactRule' }
  ]

  const [selectedType, setSelectedType] = useState<string>(null)
  const [noOperands, setNoOperands] = useState<number>(0)

  return (
    <Box
      margin="auto"
      pl="1rem"
      borderStyle="solid"
      border="1px"
      borderRadius="lg"
      {...rest}
    >
      <Box>
        <FormControl>
          <FormLabel>Rule type:</FormLabel>
          <RadioGroup
            options={ruleTypes}
            name={baseName + '.type'}
            onChange={e => {
              console.log(e)
              setSelectedType(e.toString())
              setNoOperands(e === 'FactRule' ? 0 : Math.max(1, noOperands))
            }}
          />
        </FormControl>
      </Box>
      {['AndRule', 'OrRule', 'NotRule'].includes(selectedType) && (
        <FormControl>
          <FormLabel>Rule operands:</FormLabel>
          {Array.from(Array(noOperands), (e, i) => (
            <RuleFields
              key={i}
              baseName={baseName + '.operands[' + i + ']'}
              facts={facts}
            />
          ))}
          {['AndRule', 'OrRule'].includes(selectedType) && (
            <Button
              leftIcon={<PlusSquareIcon />}
              onClick={() => setNoOperands(noOperands + 1)}
            >
              Operand
            </Button>
          )}
        </FormControl>
      )}
      {['FactRule'].includes(selectedType) && (
        <fieldset>
          <LabeledSelect
            name={baseName + '.factId'}
            options={facts.map(fact => ({
              label: fact.name,
              value: fact.id
            }))}
          />
        </fieldset>
      )}
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

  const formRef = useRef<FormHandles>(null)
  const emptyRule = { type: null, operands: [] }

  useEffect(() => {
    api.get(`/projects/${projectId}/facts`).then(response => {
      setFacts(response.data)
    })
  }, [projectId])

  useEffect(() => {
    api.get(`/projects/${projectId}/rules`).then(res => setRules(res.data))
  }, [projectId])

  const validateFacts = function (rule: RuleData) {
    console.log(rule)
    if (['AndRule', 'NotRule', 'OrRule'].includes(rule.type)) {
      return rule.operands.every(validateFacts)
    } else {
      return rule.type === 'FactRule'
    }
  }

  const handleNewRule = useCallback(
    data => {
      data.rule.projectId = projectId
      if (!validateFacts(data.rule)) {
        alert('All leaf operands must be facts!')
        return
      }
      api
        .post('/rules', data.rule)
        .then(res => {
          setRules([...rules, res.data])
          formRef.current.reset({ type: null })
        })
        .catch(res => {
          console.log(res)
          alert('Error creating new rule')
        })
    },
    [projectId, rules]
  )

  return (
    <Box maxWidth="6xl" margin="auto" {...rest}>
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
          <Heading as="h3" size="lg">
            Create new rule
          </Heading>
          <Form onSubmit={handleNewRule} ref={formRef} initialData={emptyRule}>
            <RuleFields baseName="rule" facts={facts} />
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
        <Box m="1rem" p="1rem" borderRadius="lg" border="1px">
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
                <strong>
                  <RuleLabel rule={rule} />
                </strong>
              </Text>
              <ButtonGroup marginLeft="auto">
                <IconButton
                  isDisabled={true}
                  aria-label="Remove rule"
                  title="Remove rule"
                  icon={<DeleteIcon />}
                />
                <IconButton
                  isDisabled={true}
                  aria-label="Edit rule"
                  title="Edit rule"
                  icon={<EditIcon />}
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
