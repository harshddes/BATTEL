import { User, UserRegistrationInput } from '../shared/user.types';
// import { UserModel } from './user.model';

// In-memory storage for demo
const users: Map<string, User> = new Map();
let userIdCounter = 1;

export class UserRepository {
  async save(userData: UserRegistrationInput): Promise<User> {
    const user: User = {
      id: (userIdCounter++).toString(),
      email: userData.email,
      salt: userData.salt,
      encryptedPrivateKey: userData.encryptedPrivateKey,
      publicKey: userData.publicKey,
      createdAt: new Date()
    };
    
    users.set(user.email, user);
    console.log(`Demo: User registered - ${user.email}`);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return users.get(email) || null;
  }

  async findById(id: string): Promise<User | null> {
    for (const user of users.values()) {
      if (user.id === id) return user;
    }
    return null;
  }
} 