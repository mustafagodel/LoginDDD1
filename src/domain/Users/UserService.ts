import { injectable } from 'inversify';
import { UserRepository } from './UserRepository';
import { User } from './User';

@injectable()
export class UserService {
    constructor(public userRepository: UserRepository) {}

    async login(username: string, password: string): Promise<string> {
        const user = await this.userRepository.findByUsername(username, password);
        if (user && user.password === password) {
            return 'Login successful!';
        }
        return 'Incorrect Username or Password!';
    }

    async register(username: string, password: string): Promise<string> {
        const existingUser = await this.userRepository.findByUsername(username, password);
        if (existingUser) {
            return 'This username is already in use!';
        }
        const newUser = new User(username, password);
        await this.userRepository.add(newUser);
        return 'User added successfully';
    }
}
