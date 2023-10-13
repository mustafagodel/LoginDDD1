import { Request, Response, Router } from 'express';
import { UserService } from '../domain/Users/UserService';
import { inject, injectable } from 'inversify';
import Outmiddleware from '../middleware/Outmiddleware';
import 'reflect-metadata';
import { UserApplicationService } from '../appservices/UserApplicationService'; 
import jwt from 'jsonwebtoken';
import express from 'express';
require('dotenv').config();

@injectable()
export class UserController {
    private readonly router: Router;
    private readonly userAppService: UserApplicationService; 

    constructor(@inject(UserService) private userService: UserService) {
        this.router = express.Router();
        this.userAppService = new UserApplicationService(userService);
                this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/register', async (req: Request, res: Response) => {
            const { username, password } = req.body;
            const insertedUser = await this.userAppService.registerUser(username, password);
            if (insertedUser.code === 0) {
                res.json(insertedUser);
            } else {
                res.status(401).json(insertedUser);
            }
        });

        this.router.post('/login',async (req: Request, res: Response) => {
            const { username, password } = req.body;
            const response = await this.userAppService.loginUser(username, password);
        
            if (response.code === 0) {
                res.json(response);
            } else {
                res.status(401).json(response);
            }
            this.router.use(Outmiddleware);
        });
    }

    getRouter(): Router {
        return this.router;
    }
}
