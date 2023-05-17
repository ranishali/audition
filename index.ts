import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { Base62UrlConversionService, MongoDB, MongoURLRepositoryService, MongoSeedRepositoryService, UrlService } from './src/services';
import { UrlController } from './src/controllers/url-controller';
import { IDatabase, IRepository, IURL, IRouter, IUrlConvertor, ISeed } from './src/models';
import { MainRouter, UrlRouter } from './src/routes';

dotenv.config();

// repo/storage 
const urlRepo: IRepository<IURL> = new MongoURLRepositoryService('url');
const seedRepo: IRepository<ISeed> = new MongoSeedRepositoryService('seed');

// services
const base62UrlConvertor: IUrlConvertor = new Base62UrlConversionService(seedRepo);
const urlService: UrlService = new UrlService(urlRepo, base62UrlConvertor);

// controllers
const urlController: UrlController = new UrlController(urlService);

// routes
const urlRouter: IRouter = new UrlRouter(urlController);
const mainRouter: IRouter = new MainRouter();

// web server
const app: Express = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)))
const port = process.env.PORT || 5001;

// connect database
const database: IDatabase = new MongoDB();
database.connect({
    connectionString: process.env.DB_CONNECTION || ""
});

// configure api route endpoints
mainRouter.configureRoutes(app);
urlRouter.configureRoutes(app);

// start listening on port
app.listen(port, () => console.log(`Server listening at ${process.env.WEBSITE_URL}`));