// app.ts

import express from 'express';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import { Container } from 'inversify'; // inversify.config.ts'yi içe aktarın
import container from './inversify.config'; // Yapılandırma dosyasını içe aktarın
import { UserController } from './src/controller/UserController';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const userController = container.get<UserController>('UserController');
app.use('/domain', userController.getRouter());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
