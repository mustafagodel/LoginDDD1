import { injectable } from 'inversify';
import { UserService } from '../domain/Users/UserService';
import jwt from 'jsonwebtoken';
import {ApiResponse} from '../infrastructure/ApiResponse';



require('dotenv').config();

@injectable()
export class UserApplicationService {
    constructor(private userService: UserService) {}

    async registerUser(username: string, password: string): Promise<ApiResponse<any>> {
        const message = await this.userService.register(username, password);
        if (message === 'Login successful!') {
        return new ApiResponse(0, 'User added successfully', message);
        }else {
            return new ApiResponse(0, 'No user added', message);
        }
    }

    async loginUser(username: string, password: string): Promise<ApiResponse<{ token: string } | string>> {
        const message = await this.userService.login(username, password);
   
   
        if (message === 'Login successful!') {
            const secretKey = process.env.SECRET_KEY;
        
            if (!secretKey || typeof secretKey !== 'string') {
                console.error('SECRET_KEY is missing or invalid.');
                return new ApiResponse(1, 'Internal Server Error: Invalid SECRET_KEY', 'Invalid secret key');
            }
        
            const token = jwt.sign({ username }, secretKey);
            return new ApiResponse(0, 'Login successful', { token });
        } else {
            return new ApiResponse(1, 'Incorrect Username or Password', message);
        }
        
    }
}

