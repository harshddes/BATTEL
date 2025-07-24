import { Response } from 'express';
import { FileService } from '../core/file.service';
import { FileRepository } from '../infrastructure/file.repository';
import { FileUploadRequest } from '../shared/api.types';
import { AuthRequest } from '../shared/types/express.types';

const fileRepo = new FileRepository();
const fileService = new FileService(fileRepo);

export const uploadFile = async (req: AuthRequest, res: Response) => {
  try {
    const fileData: FileUploadRequest = req.body;
    
    if (!fileData.fileId || !fileData.encryptedFile || !fileData.encryptedFileKey) {
      return res.status(400).json({
        success: false,
        error: 'Missing encrypted file data'
      });
    }

    const file = await fileService.uploadFile(req.user!.id, fileData);
    
    res.status(201).json({
      success: true,
      data: file
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `File upload failed: ${(error as Error).message}`
    });
  }
};

export const getFiles = async (req: AuthRequest, res: Response) => {
  try {
    const result = await fileService.getUserFiles(req.user!.id);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to retrieve files: ${(error as Error).message}`
    });
  }
};

export const getProjectFiles = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const result = await fileService.getProjectFiles(projectId);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to retrieve project files: ${(error as Error).message}`
    });
  }
};

export const getFile = async (req: AuthRequest, res: Response) => {
  try {
    const { fileId } = req.params;
    const file = await fileService.getFile(fileId, req.user!.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }
    
    res.json({
      success: true,
      data: file
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to retrieve file: ${(error as Error).message}`
    });
  }
};

export const deleteFile = async (req: AuthRequest, res: Response) => {
  try {
    const { fileId } = req.params;
    const deleted = await fileService.deleteFile(fileId, req.user!.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to delete file: ${(error as Error).message}`
    });
  }
}; 