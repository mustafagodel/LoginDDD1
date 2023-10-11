

import { Container } from 'inversify';
import { DatabaseConnector } from './db';
import { UserRepository } from '../domain/Users/UserRepository';
import { UserService } from '../domain/Users/UserService';
import { UserController } from '../controller/UserController';

const configureContainer = (container: Container) => {

  container.bind<DatabaseConnector>(DatabaseConnector).to(DatabaseConnector);
container.bind<UserRepository>(UserRepository).to(UserRepository);


container.bind<UserService>(UserService).to(UserService);

container.bind<UserController>(UserController).to(UserController);
};

export default configureContainer;
