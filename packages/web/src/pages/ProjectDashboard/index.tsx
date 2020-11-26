import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import QuestionsBox from './QuestionsBox'
import RulesBox from './RulesBox'
import FactsBox from './FactsBox'
import RecommendationBox from './RecommendationsBox'
import ParticipationsBox from './ParticipationsBox'

interface ProjectDashboardParams {
  projectId: string
}

const ProjectDashboard: React.FC = () => {
  // const { user } = useAuth()
  const { projectId } = useParams<ProjectDashboardParams>()

  return (
    <Box maxWidth="6xl" margin="auto">
      <Tabs mt="1em">
        <TabList>
          <Tab>Facts</Tab>
          <Tab>Questions</Tab>
          <Tab>Rules</Tab>
          <Tab>Recommendations</Tab>
          <Tab>Participations</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FactsBox projectId={projectId} />
          </TabPanel>
          <TabPanel>
            <QuestionsBox projectId={projectId} />
          </TabPanel>
          <TabPanel>
            <RulesBox projectId={projectId} />
          </TabPanel>
          <TabPanel>
            <RecommendationBox projectId={projectId} />
          </TabPanel>
          <TabPanel>
            <ParticipationsBox projectId={projectId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default ProjectDashboard
