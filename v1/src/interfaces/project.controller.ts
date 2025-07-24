import { Response } from 'express';
import { ProjectService } from '../core/project.service';
import { ProjectRepository } from '../infrastructure/project.repository';
import { ProjectCreateRequest } from '../shared/api.types';
import { AuthRequest } from '../shared/types/express.types';

const projectRepo = new ProjectRepository();
const projectService = new ProjectService(projectRepo);

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const projectData: ProjectCreateRequest = req.body;
    
    if (!projectData.encryptedMetadata || !projectData.encryptedProjectKey) {
      return res.status(400).json({
        success: false,
        error: 'Missing encrypted project data'
      });
    }

    const project = await projectService.createProject(req.user!.id, projectData);
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Project creation failed: ${(error as Error).message}`
    });
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const result = await projectService.getUserProjects(req.user!.id);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to retrieve projects: ${(error as Error).message}`
    });
  }
};

export const getProject = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await projectService.getProject(projectId, req.user!.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to retrieve project: ${(error as Error).message}`
    });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const deleted = await projectService.deleteProject(projectId, req.user!.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to delete project: ${(error as Error).message}`
    });
  }
}; 