// inversify.config.ts

import { Container } from 'inversify';
import { DatabaseConnector } from './src/database/db';
import { UserRepository } from './src/domain/Users/UserRepository';
import { UserService } from './src/domain/Users/UserService';
import { UserController } from './src/controller/UserController';

const container = new Container();

container.bind<DatabaseConnector>('DatabaseConnector').to(DatabaseConnector);
container.bind<UserRepository>('UserRepository').to(UserRepository);


container.bind<UserService>('UserService').to(UserService);

container.bind<UserController>('UserController').to(UserController);

export default container;
