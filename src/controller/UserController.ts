import { Request, Response, Router } from 'express';
import { UserService } from '../domain/Users/UserService';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import jwt from 'jsonwebtoken';
import ErrorTryCatch from '../infrastructure/errorcatch';

@injectable()
export class UserController {
    private readonly router: Router;
    private Key = 'mustafagodel'; 

    constructor(@inject(UserService) private userService: UserService) {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/register', async (req: Request, res: Response) => {
            ErrorTryCatch.catchErrors(async () => {
                const { username, password } = req.body;
                const message = await this.userService.register(username, password);
                res.json({ message });
            }, req, res);
        });

        this.router.post('/login', async (req: Request, res: Response) => {
            ErrorTryCatch.catchErrors(async () => {
                const { username, password } = req.body;
                const isUserLogim = await this.userService.login(username, password);
                if (isUserLogim) {
                    const token = jwt.sign({ username }, this.Key);
                    res.json({ token });
                } else {
                    res.status(401).json({ error: 'Authentication failed.' });
                }
            }, req, res);
        });
    }

    getRouter(): Router {
        return this.router;
    }
}




