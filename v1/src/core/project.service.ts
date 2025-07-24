import { ProjectData } from '../shared/crypto.types';
import { ProjectCreateRequest, ProjectResponse } from '../shared/api.types';
import { ProjectRepository } from '../infrastructure/project.repository';

export class ProjectService {
  private projectRepo: ProjectRepository;

  constructor(projectRepo: ProjectRepository) {
    this.projectRepo = projectRepo;
  }

  async createProject(userId: string, request: ProjectCreateRequest): Promise<ProjectData> {
    const projectId = 'proj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const projectData: ProjectData = {
      projectId,
      userId,
      encryptedMetadata: request.encryptedMetadata,
      encryptedProjectKey: request.encryptedProjectKey,
      createdAt: new Date()
    };

    return this.projectRepo.save(projectData);
  }

  async getUserProjects(userId: string): Promise<ProjectResponse> {
    const projects = await this.projectRepo.findByUserId(userId);
    return { projects };
  }

  async getProject(projectId: string, userId: string): Promise<ProjectData | null> {
    return this.projectRepo.findByProjectIdAndUser(projectId, userId);
  }

  async deleteProject(projectId: string, userId: string): Promise<boolean> {
    return this.projectRepo.deleteByProjectId(projectId, userId);
  }
} 