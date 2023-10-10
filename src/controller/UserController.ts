import { Request, Response, Router } from 'express';
import { UserService } from '../domain/Users/UserService';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UserController {
    private readonly router: Router;

    constructor(@inject(UserService) private userService: UserService) {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/register', async (req: Request, res: Response) => {
            const { username, password } = req.body;

            try {
                const message = await this.userService.register(username, password);
                res.json({ message });
            } catch (error) {
                res.status(500).json({ error: 'Registration failed.' });
            }
        });

        this.router.post('/login', async (req: Request, res: Response) => {
            const { username, password } = req.body;

            try {
                const message = await this.userService.login(username, password);
                res.json({ message });
            } catch (error) {
                res.status(401).json({ error: 'Login failed.' });
            }
        });
    }

    getRouter(): Router {
        return this.router;
    }
}