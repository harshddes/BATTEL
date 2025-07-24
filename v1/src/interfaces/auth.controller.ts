import { Request, Response } from 'express';
import { UserService } from '../core/user.service';
import { UserRepository } from '../infrastructure/user.repository';
import { UserRegistrationInput, UserLoginInput } from '../shared/user.types';
import { generateToken } from '../shared/auth.middleware';

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

export const register = async (req: Request, res: Response) => {
  try {
    const registrationData: UserRegistrationInput = req.body;
    
    // Validate required fields
    if (!registrationData.email || !registrationData.salt || 
        !registrationData.encryptedPrivateKey || !registrationData.publicKey) {
      return res.status(400).json({
        success: false,
        error: 'Missing required encryption data'
      });
    }

    const result = await userService.registerUser(registrationData);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Registration failed: ${(error as Error).message}`
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginData: UserLoginInput = req.body;
    
    if (!loginData.email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    const result = await userService.authenticateUser(loginData);
    
    if (result.success && result.userData) {
      // Generate JWT token for API access
      const user = await userService.getUserByEmail(loginData.email);
      if (user) {
        const token = generateToken(user.id, user.email);
        res.json({
          ...result,
          token
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Authentication failed'
        });
      }
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Authentication failed: ${(error as Error).message}`
    });
  }
}; 