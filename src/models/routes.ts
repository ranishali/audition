import { Express } from 'express';

export interface IRouter {
    configureRoutes(app: Express): void
}