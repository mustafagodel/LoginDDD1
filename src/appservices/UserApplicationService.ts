import { injectable } from 'inversify';
import { UserService } from '../domain/Users/UserService';

@injectable()
export class UserApplicationService {
    constructor(private userService: UserService) {}

    async registerUser(username: string, password: string): Promise<string> {
        try {
            const message = await this.userService.register(username, password);
            return message;
        } catch (error) {
            throw error;
        }
    }

    async loginUser(username: string, password: string): Promise<string> {
     
        try {
            const message = await this.userService.login(username, password);
            return message;
        } catch (error) {
            throw error;
        }
    }
}
