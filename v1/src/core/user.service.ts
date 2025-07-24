import { User, UserRegistrationInput, UserLoginInput, UserAuthResponse } from '../shared/user.types';
import { UserRepository } from '../infrastructure/user.repository';

export class UserService {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async registerUser(input: UserRegistrationInput): Promise<UserAuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepo.findByEmail(input.email);
      if (existingUser) {
        return {
          success: false,
          message: 'User already exists with this email'
        };
      }

      // Validate encrypted key data
      if (!input.salt || !input.encryptedPrivateKey || !input.publicKey) {
        return {
          success: false,
          message: 'Invalid encryption data provided'
        };
      }

      // Save user with encrypted keys (no password stored)
      await this.userRepo.save(input);

      return {
        success: true,
        message: 'User registered successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: `Registration failed: ${(error as Error).message}`
      };
    }
  }

  async authenticateUser(input: UserLoginInput): Promise<UserAuthResponse> {
    try {
      // Find user by email
      const user = await this.userRepo.findByEmail(input.email);
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      // Return encrypted user data for client-side key derivation
      // Note: password is not verified server-side in zero-knowledge architecture
      return {
        success: true,
        userData: {
          salt: user.salt,
          encryptedPrivateKey: user.encryptedPrivateKey,
          publicKey: user.publicKey
        }
      };
    } catch (error) {
      return {
        success: false,
        message: `Authentication failed: ${(error as Error).message}`
      };
    }
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }
} 