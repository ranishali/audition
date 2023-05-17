import * as td from 'testdouble';
import { expect } from 'chai';
import { MongoDB, MongoSeedRepositoryService } from '../../src/services';
import { IDatabase, IRepository, ISeed } from '../../src/models';
import { testMongoDBConnection } from '../config';

describe('MongoSeedRepositoryService', () => {
    beforeEach(() => td.reset());

    const seedRepoService: IRepository<ISeed> = new MongoSeedRepositoryService('seed-test');

    const database: IDatabase = new MongoDB();
    database.connect({
        connectionString: testMongoDBConnection || ""
    });

    it('should delete seed record successfully', async () => {
        await seedRepoService.delete(<any>{});
    });

    it('should create seed record successfully', async () => {
        const response = await seedRepoService.create({
            counter: 77777777,
            version: 0
        });

        expect(response).to.not.be.undefined;
        expect(response.counter).to.equal(77777777);
        expect(response.version).to.equal(0);
    });

    it('should update seed record successfully', async () => {
        const update: ISeed = {
            counter: 88888888,
            version: 1
        }

        const response = await seedRepoService.update(update);

        expect(response).to.not.be.undefined;
        expect(response.counter).to.equal(88888888);
        expect(response.version).to.equal(1);
    });

    it('should find seed record successfully - create on the first try', async () => {
        await seedRepoService.delete(<any>{});

        const response = await seedRepoService.find(<any>{});

        expect(response).to.not.be.undefined;
        expect(response!.counter).to.equal(56800235584);
        expect(response!.version).to.equal(0);
    });

    it('should find seed record successfully - increment counter and return', async () => {
        const response = await seedRepoService.find(<any>{});

        expect(response).to.not.be.undefined;
        expect(response!.counter).to.equal(56800235585);
        expect(response!.version).to.equal(1);
    });
}) 