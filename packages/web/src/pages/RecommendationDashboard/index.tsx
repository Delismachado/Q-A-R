import React, { useEffect, useState } from 'react'
import api from '../../services/api'

import { Box, Heading, List, ListIcon, ListItem } from '@chakra-ui/core'

interface RecommendationDashboardParams {
  name: string
  description: string
  projectId: string
}

const RecommendationDashboard: React.FC = () => {
  // const [recommendation, setRecommendation] = useState([])

  // useEffect(() => {
  //   api.get('/recommendation').then(response => {
  //     setRecommendation(response.data)
  //   })
  // }, [])

  return (
    <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="blue.50">
      <Heading as="h2" size="lg" paddingBottom="1rem">
        Your next steps | Recommendations
      </Heading>
      <List spacing={5} borderRadius="lg">
        <ListItem borderRadius="lg">
          <ListIcon icon="check-circle" color="green.500" />
          Lorem ipsum netus curae nostra magna commodo sed, sem etiam
          sollicitudin imperdiet suspendisse nibh risus bibendum.
        </ListItem>
        <ListItem borderRadius="lg">
          <ListIcon icon="check-circle" color="green.500" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit sollicitudin
          imperdiet suspendisse nibh risus bibendum.
        </ListItem>
        <ListItem borderRadius="lg">
          <ListIcon icon="check-circle" color="green.500" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit sollicitudin
          imperdiet suspendisse nibh risus bibendum.
        </ListItem>
      </List>
    </Box>
  )
}

export default RecommendationDashboard
