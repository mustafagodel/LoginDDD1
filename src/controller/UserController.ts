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
            ErrorCatch(async () => {
                const { username, password } = req.body;
                const message = await this.userService.register(username, password);
                res.json({ message });
            }, req, res);
        });
        
        this.router.post('/login', async (req: Request, res: Response) => {
            ErrorCatch(async () => {
                const { username, password } = req.body;
                const message = await this.userService.login(username, password);
                res.json({ message });
            }, req, res);
        });
    }

    getRouter(): Router {
        return this.router;
    }
}


async function ErrorCatch(routeFn: (req: Request, res: Response) => Promise<void>, req: Request, res: Response) {
    try {
        await routeFn(req, res);
    } catch (error) {
        console.error('Eroor:', error);
        res.status(500).json({ error: 'Something Went Wrong' });
    }
}