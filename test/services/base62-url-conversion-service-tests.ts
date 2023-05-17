import * as td from 'testdouble';
import { expect } from 'chai';
import { Base62UrlConversionService, MongoSeedRepositoryService } from '../../src/services';
import { IRepository, ISeed, IURL, IUrlConvertor } from '../../src/models';

describe('Base62URLConversionService', () => {
    beforeEach(() => td.reset());

    const mockSeedRepoService: IRepository<ISeed> = new (td.constructor(MongoSeedRepositoryService))();
    const base62ConversionService: IUrlConvertor = new Base62UrlConversionService(mockSeedRepoService);

    const testURL: IURL = {
        code: '1000000',
        originalUrl: `https://mywebiste.com/6462e4262ffe276a33f78def#/metrics/replicaSet/6462e4bf5caa6659115c92e1/explorer/test/`,
        shortUrl: `https://aud.io/1000000`
    }

    it('should return short code successfully for counter 56800235584', async () => {
        const seed: ISeed = {
            counter: 56800235584,
            version: 0
        }

        td.when(mockSeedRepoService.find({}))
            .thenResolve(seed);

        const response = await base62ConversionService.getShortUrlCode(testURL.originalUrl);

        expect(response).to.not.be.undefined;
        expect(response).to.equal('1000000');
    });

    it('should return short code successfully for counter 86800235584', async () => {
        const seed: ISeed = {
            counter: 86800235584,
            version: 100
        }

        td.when(mockSeedRepoService.find({}))
            .thenResolve(seed);

        const response = await base62ConversionService.getShortUrlCode(testURL.originalUrl);

        expect(response).to.not.be.undefined;
        expect(response).to.equal('1WkGwRk');
    });

    it('should return empty short code if no seed found', async () => {
        td.when(mockSeedRepoService.find({}))
            .thenReject(new Error('some error ocurred'));

        const response = await base62ConversionService.getShortUrlCode(testURL.originalUrl);

        expect(response).to.not.be.undefined;
        expect(response).to.equal('');
    });
}) 