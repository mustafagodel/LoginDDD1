import express from 'express';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import { Container } from 'inversify';
import configureContainer from './src/infrastructure/inversify.config';
import { UserController } from './src/controller/UserController';
import Middleware from './src/middleware/Exectionmiddleware';
import { UserApplicationService } from './src/appservices/UserApplicationService'

require('dotenv').config();

const app = express();
const port = process.env.PORT1 || 3000;

const container = new Container();
configureContainer(container);

app.use(Middleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userController = container.get<UserController>(UserController);
const userApplicationService = container.get<UserApplicationService>(UserApplicationService);

app.use('/api', userController.getRouter());

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const message = await userApplicationService.registerUser(username, password);
    res.json({ message });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const message = await userApplicationService.loginUser(username, password);
    res.json({ message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
