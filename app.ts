

import express from 'express';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import { Container } from 'inversify'; 
import configureContainer from './src/infrastructure/inversify.config'
import { UserController } from './src/controller/UserController';

const app = express();
const port = process.env.PORT || 3000;

const container = new Container();

configureContainer(container);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const userController = container.get<UserController>(UserController);
app.use('/domain', userController.getRouter());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
