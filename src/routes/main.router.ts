import { Express, Request, Response } from 'express';
import { IRouter } from '../models';
import path from 'path';

export class MainRouter implements IRouter {
    constructor() {
    }

    configureRoutes(app: Express): void {
        app.get('/', (req: Request, res: Response) => {
            const htmlPath = path.join(__dirname, '../../', 'index.html');
            res.sendFile(htmlPath);
        });
    }
}
