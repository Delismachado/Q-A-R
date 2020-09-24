import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import LabeledInput from '../../components/LabeledInput'
import Select from '../../components/LabeledSelect'
import Textarea from '../../components/Textarea'
import { FormHandles } from '@unform/core'
import {
  Box,
  Heading,
  Flex,
  IconButton,
  SimpleGrid,
  ButtonGroup,
  Button,
  Text
} from '@chakra-ui/core'
import { Form } from '@unform/web'

interface ProjectData {
  id: string
  name: string
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [editingProject, setEditingProject] = useState<ProjectData>()

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, [user])

  const formRef = useRef<FormHandles>(null)

  const handleSaveProject = (project: ProjectData) => {
    if (editingProject) {
      api.put(`/projects/${editingProject.id}`, project).then(q => {
        const newProjects = projects.map(pr =>
          pr.id === editingProject.id ? q.data : pr
        )
        setProjects(newProjects)
        setEditingProject(null)
      })
    } else {
      api
        .post('/projects', project)
        .then(q => setProjects([...projects, q.data]))
    }
    formRef.current.reset()
  }

  const handleRemoveProject = (project: ProjectData) => {
    api.delete(`/projects/${project.id}`).then(() => {
      setProjects(projects.filter(p => p.id !== project.id))
    })
  }

  const handleEditProject = (project: ProjectData) => {
    setEditingProject(project)
    formRef.current.setData(project)
  }

  return (
    <Box maxWidth="6xl" margin="auto">
      <SimpleGrid columns={[1, 1, 1, 2]}>
        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.200">
          <Heading as="h3" size="lg">
            Create new project
          </Heading>
          <Form onSubmit={handleSaveProject} ref={formRef}>
            <LabeledInput
              label="Project name"
              placeholder="Your project name"
              name="name"
            />
            <ButtonGroup mt="1rem">
              <Button className="button" type="reset">
                Reset
              </Button>
              <Button className="button" type="submit" variantColor="green">
                {editingProject ? 'Update project' : 'Create new project'}
              </Button>
            </ButtonGroup>
          </Form>
        </Box>
        <Box m="1rem" p="1rem" borderRadius="lg" backgroundColor="gray.200">
          <Heading as="h3" size="lg">
            Projects list
          </Heading>
          {projects.map(project => (
            <Flex
              key={project.id}
              border="1px"
              borderColor="gray.500"
              borderRadius="lg"
              padding=".5rem"
              marginY=".5rem"
              verticalAlign="middle"
            >
              <Text>
                <strong>{project.name}</strong>
              </Text>
              <ButtonGroup marginLeft="auto">
                <IconButton
                  aria-label="Remove project"
                  title="Remove question"
                  icon="delete"
                  onClick={() => handleRemoveProject(project)}
                />
                <IconButton
                  aria-label="Edit project"
                  title="Edit question"
                  icon="edit"
                  onClick={() => handleEditProject(project)}
                />
                <Link to={`/projects/${project.id}`}>
                  <IconButton
                    aria-label="View project"
                    title="View project"
                    icon="info"
                  />
                </Link>
              </ButtonGroup>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default AdminDashboard
