"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../domain/Users/UserService");
const inversify_1 = require("inversify");
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
require("reflect-metadata");
const UserApplicationService_1 = require("../appservices/UserApplicationService");
const express_1 = __importDefault(require("express"));
require('dotenv').config();
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.router = express_1.default.Router();
        this.userAppService = new UserApplicationService_1.UserApplicationService(userService);
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/register', async (req, res) => {
            const { username, password } = req.body;
            const insertedUser = await this.userAppService.registerUser(username, password);
            if (insertedUser.code === 0) {
                res.json(insertedUser);
            }
            else {
                res.status(401).json(insertedUser);
            }
        });
        this.router.post('/login', async (req, res) => {
            const { username, password } = req.body;
            const response = await this.userAppService.loginUser(username, password);
            if (response.code === 0) {
                res.json(response);
            }
            else {
                res.status(401).json(response);
            }
        });
        this.router.get('/token', AuthMiddleware_1.default, (req, res) => {
            res.json({ message: 'This is a token route', user: req.user });
        });
    }
    getRouter() {
        return this.router;
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(UserService_1.UserService)),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
//# sourceMappingURL=UserController.js.map