import { injectable } from 'inversify';
import { UserRepository } from './UserRepository';
import { User } from './User';

@injectable()
export class UserService {
    constructor(public userRepository: UserRepository) {}

    async login(username: string, password: string): Promise<string> {
        const result = await this.userRepository.findByUsername(username, password);
        if (result.success) {
            const user = result.user;
            if (user && user.password === password) {
                return 'Login successful!';
            }
        }
        return 'Incorrect Username or Password!';
    }

    async register(username: string, password: string): Promise<string> {
        const existingUserResult = await this.userRepository.findByUsername(username, password);
        if (existingUserResult.success) {
            const existingUser = existingUserResult.user;
            if (existingUser) {
                return 'This username is already in use!';
            }
        }

        const newUser = new User(username, password);
        const addUserResult = await this.userRepository.add(newUser);
        if (addUserResult.success) {
            return 'User added successfully';
        }

        return 'User registration failed'; 
        
    }
}
