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
                const insertedUser = await this.userService.register(username, password);
                if (insertedUser=="User added successfully") {
                    res.json({ 
                        code: 0, 
                        message: 'User added successfully',
                        data: {
                        }
                    });
                } else {
                    res.status(400).json({ 
                        code: 1, 
                        message: 'This username is already in use!'
                    });
                }
            }, req, res);
        });
    
        this.router.post('/login', async (req: Request, res: Response) => {
            ErrorTryCatch.catchErrors(async () => {
                const { username, password } = req.body;
                const isUserLogin = await this.userService.login(username, password);
    
                if (isUserLogin=="Login successful!") {
                    const token = jwt.sign({ username }, this.Key);
                    res.json({ 
                        code: 0, 
                        message: 'Login successful!',
                        data: {
                            token
                        }
                    });
                } else {
                    res.status(401).json({ 
                        code: 1, 
                        message: 'Incorrect Username or Password!'
                    });
                }
            }, req, res);
        });
    }
    

    getRouter(): Router {
        return this.router;
    }
}




