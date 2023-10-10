
import mysql, { Connection } from 'mysql2';
import { injectable } from 'inversify';

@injectable()
export class DatabaseConnector {
    private connection: Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root1234',
            database: 'database1',
        });
        this.connection.connect((err) => {
            if (err) {
                console.error('MySQL connection error:', err);
                throw err;
            }
            console.log('MySQL connected.');
        });
    }

    getConnection(): Connection {
        return this.connection;
    }
}
