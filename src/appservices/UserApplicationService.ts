import { injectable } from 'inversify';
import { UserService } from '../domain/Users/UserService';
import { Request, Response } from 'express'; 

@injectable()
export class UserApplicationService {
    constructor(private userService: UserService) {}

    async registerUser(username: string, password: string, req: Request, res: Response): Promise<any> {
        const message = await this.userService.register(username, password);
        res.json({ message });
    }

    async loginUser(username: string, password: string, req: Request, res: Response): Promise<any> {
        const message = await this.userService.login(username, password);
        res.json({ message });
    }
}
