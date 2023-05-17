export interface IDatabase {
    connect(config: IDatabaseConfig): Promise<void>;
}

export interface IDatabaseConfig {
    connectionString: string;
}