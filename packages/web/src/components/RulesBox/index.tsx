import React from 'react'
import { Box, BoxProps } from '@chakra-ui/core'

interface RulesBoxProps extends BoxProps {
  projectId: string
}

const RulesBox: React.FC<RulesBoxProps> = ({
  projectId,
  ...rest
}: RulesBoxProps) => {
  return <Box {...rest}>rules {projectId}!</Box>
}

export default RulesBox
