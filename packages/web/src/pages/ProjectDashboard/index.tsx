import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core'
import QuestionsBox from '../../components/QuestionsBox'
import RulesBox from '../../components/RulesBox'

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
          <Tab>Questions</Tab>
          <Tab>Rules</Tab>
        </TabList>
        <TabPanels>
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
