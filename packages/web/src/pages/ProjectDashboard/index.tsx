import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core'
import QuestionsBox from '../../components/QuestionsBox'
import RulesBox from '../../components/RulesBox'
import FactsBox from '../../components/FactsBox'

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
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default ProjectDashboard
