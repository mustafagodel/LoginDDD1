import { injectable } from 'inversify';
import { UserService } from '../domain/Users/UserService';
import ErrorTryCatch from '../infrastructure/errorcatch';
import { Request, Response } from 'express'; // express modülünü içe aktarıyoruz

@injectable()
export class UserApplicationService {
    constructor(private userService: UserService) {}

    async registerUser(username: string, password: string, req: Request, res: Response): Promise<any> {
        ErrorTryCatch.catchErrors(async () => {
            const message = await this.userService.register(username, password);
            res.json({ message });
        }, req, res);
    
    }

    async loginUser(username: string, password: string, req: Request, res: Response): Promise<any> {
        ErrorTryCatch.catchErrors(async () => {
            const message = await this.userService.login(username, password);
            res.json({ message });
        }, req, res);
    }
}
