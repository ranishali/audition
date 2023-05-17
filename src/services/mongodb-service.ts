import mongoose from 'mongoose';
import { IDatabase, IDatabaseConfig } from "../models";

export class MongoDB implements IDatabase {

    constructor() {
    }

    async connect(config: IDatabaseConfig): Promise<void> {
        if (!config.connectionString) {
            throw new Error('DB connection string not defined');
        }
        const connection = mongoose.connection;
        connection.on('open', () => console.log('Databse Connected'))
        connection.on('error', (error) => console.error('Database error: ', JSON.stringify(error)));
        await mongoose.connect(config.connectionString)
            .catch((error) => {
                console.error(`Error connecting database:${error.message}`)
            });
    }
}