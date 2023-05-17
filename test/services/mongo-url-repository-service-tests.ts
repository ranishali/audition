import * as td from 'testdouble';
import { expect } from 'chai';
import { MongoDB, MongoSeedRepositoryService, MongoURLRepositoryService } from '../../src/services';
import { IDatabase, IRepository, ISeed, IURL } from '../../src/models';
import { testMongoDBConnection } from '../config';

describe('MongoUrlRepositoryService', () => {
    beforeEach(() => td.reset());

    const urlRepoService: IRepository<IURL> = new MongoURLRepositoryService('url-test');

    const database: IDatabase = new MongoDB();
    database.connect({
        connectionString: testMongoDBConnection || ""
    });

    it('should create url record successfully', async () => {
        const url: IURL = {
            code: '1000000',
            originalUrl: `https://mywebiste.com/6462e4262ffe276a33f78def#/metrics/replicaSet/6462e4bf5caa6659115c92e1/explorer/test/`,
            shortUrl: `https://aud.io/1000000`
        }
        const response = await urlRepoService.create(url);

        expect(response).to.not.be.undefined;
        expect(response.code).to.equal(url.code);
        expect(response.originalUrl).to.equal(url.originalUrl);
        expect(response.shortUrl).to.equal(url.shortUrl);
    });

    it('should find url record successfully', async () => {
        const url: IURL = {
            code: '1000000',
            originalUrl: `https://mywebiste.com/6462e4262ffe276a33f78def#/metrics/replicaSet/6462e4bf5caa6659115c92e1/explorer/test/`,
            shortUrl: `https://aud.io/1000000`
        }
        const response = await urlRepoService.find({ shortUrl: url.shortUrl });

        expect(response).to.not.be.undefined;
        expect(response!.code).to.equal(url.code);
        expect(response!.originalUrl).to.equal(url.originalUrl);
        expect(response!.shortUrl).to.equal(url.shortUrl);
    });

    it('should return null on find if url record does not exists', async () => {
        const url: IURL = {
            code: '1000ABCF',
            originalUrl: `https://mywebiste.com/6462e4bf5caa6659115c92e1/explorer/test/`,
            shortUrl: `https://aud.io/1000ABCF`
        }
        const response = await urlRepoService.find({ shortUrl: url.shortUrl });

        expect(response).to.equal(null);
    });
}) 