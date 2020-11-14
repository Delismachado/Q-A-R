import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateProjectService from '@modules/Projects/services/CreateProjectService'
import ListProjectsService from '@modules/Projects/services/ListProjectsService'
import GetProjectService from '@modules/Projects/services/GetProjectService'
import DeleteProjectService from '@modules/Projects/services/DeleteProjectService'
import UpdateProjectService from '@modules/Projects/services/UpdateProjectService'

class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body
    const createProjects = container.resolve(CreateProjectService)
    const question = await createProjects.execute({
      name
    })
    return response.status(201).json(question)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProjects = container.resolve(ListProjectsService)
    const projects = await listProjects.execute()
    return response.status(201).json(projects)
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params
    const getProject = container.resolve(GetProjectService)
    const project = await getProject.execute(projectId)
    return response.status(201).json(project)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params
    const deleteProject = container.resolve(DeleteProjectService)
    const project = await deleteProject.execute(projectId)
    return response.status(201).json(project)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params
    const data = request.body
    const getProject = container.resolve(UpdateProjectService)
    const project = await getProject.execute(projectId, data)
    return response.status(201).json(project)
  }
}

export default ProjectsController
