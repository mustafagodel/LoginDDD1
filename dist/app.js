"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const inversify_1 = require("inversify");
const inversify_config_1 = __importDefault(require("./infrastructure/inversify.config"));
const UserController_1 = require("./controller/UserController");
const ExecptionMiddleware_1 = __importDefault(require("./middleware/ExecptionMiddleware"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const container = new inversify_1.Container();
(0, inversify_config_1.default)(container);
app.use(ExecptionMiddleware_1.default);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const userController = container.get(UserController_1.UserController);
app.use('/api', userController.getRouter());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map