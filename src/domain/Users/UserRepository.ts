import { Connection, RowDataPacket } from 'mysql2';
import { inject, injectable } from 'inversify';
import { User } from './User';
import { DatabaseConnector } from '../../database/db';

@injectable()
export class UserRepository {
    constructor(@inject('DatabaseConnector') private readonly mysqlConnection: Connection) {}

    async findByUsername(username: string, password: string): Promise<User | undefined> {
        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        return new Promise<User | undefined>((resolve, reject) => {
            this.mysqlConnection.query(query, [username, password], (err, results: RowDataPacket[]) => {
                if (err) {
                    reject(err);
                } else {
                    if (results && results[0]) {
                        const user = new User(results[0].username, results[0].password);
                        resolve(user);
                    } else {
                        resolve(undefined);
                    }
                }
            });
        });
    }

    async add(user: User): Promise<void> {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        return new Promise<void>((resolve, reject) => {
            this.mysqlConnection.query(query, [user.username, user.password], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}