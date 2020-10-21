import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import { Box } from '@chakra-ui/core'
import api from '../../services/api'

interface RecommendationDashboardParams {
  recommendationId: string
  projectId: string
}

const RecommendationDashboard: React.FC = () => {
  // const [recommendation, setRecommendation] = useState([])

  // useEffect(() => {
  //   api.get(`/projects/${projectId}/recommendation`).then(response => {
  //     setRecommendation(response.data)
  //   })
  // }, [projectId])

  return (
    <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="blue.50"></Box>
  )
}

export default RecommendationDashboard
