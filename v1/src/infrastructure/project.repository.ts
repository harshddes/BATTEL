import { ProjectData } from '../shared/crypto.types';
// import { ProjectModel } from './project.model';

// In-memory storage for demo
const projects: Map<string, ProjectData> = new Map();

export class ProjectRepository {
  async save(projectData: ProjectData): Promise<ProjectData> {
    projects.set(projectData.projectId, projectData);
    console.log(`Demo: Project created - ${projectData.projectId}`);
    return projectData;
  }

  async findByUserId(userId: string): Promise<ProjectData[]> {
    return Array.from(projects.values()).filter(p => p.userId === userId);
  }

  async findByProjectId(projectId: string): Promise<ProjectData | null> {
    return projects.get(projectId) || null;
  }

  async findByProjectIdAndUser(projectId: string, userId: string): Promise<ProjectData | null> {
    const project = projects.get(projectId);
    return (project && project.userId === userId) ? project : null;
  }

  async deleteByProjectId(projectId: string, userId: string): Promise<boolean> {
    const project = projects.get(projectId);
    if (project && project.userId === userId) {
      projects.delete(projectId);
      console.log(`Demo: Project deleted - ${projectId}`);
      return true;
    }
    return false;
  }
} 