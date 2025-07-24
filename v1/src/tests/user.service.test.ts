import { UserService } from '../core/user.service';
import { UserRepository } from '../infrastructure/user.repository';
import bcrypt from 'bcryptjs';

jest.mock('../infrastructure/user.repository');

const mockRepo = new UserRepository() as jest.Mocked<UserRepository>;
const userService = new UserService(mockRepo);

describe('UserService', () => {
  it('should create a user', async () => {
    const input = { email: 'test@example.com', password: 'password' };
    mockRepo.save.mockResolvedValue({ ...input, id: '1', createdAt: new Date(), password: 'hashed' });
    const user = await userService.createUser(input);
    expect(user).toHaveProperty('id');
  });

  it('should login user', async () => {
    mockRepo.findByEmail.mockResolvedValue({ id: '1', email: 'test@example.com', password: await bcrypt.hash('password', 10), createdAt: new Date() });
    const token = await userService.login('test@example.com', 'password');
    expect(token).toBeDefined();
  });
}); 