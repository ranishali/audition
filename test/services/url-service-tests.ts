import * as td from 'testdouble';
import { expect } from 'chai';
import { Base62UrlConversionService, MongoURLRepositoryService, UrlService } from '../../src/services';
import { IRepository, ISeed, IURL, IUrlConvertor } from '../../src/models';

describe('UrlService', () => {
    beforeEach(() => td.reset());

    const mockUrlRepoService: IRepository<IURL> = new (td.constructor(MongoURLRepositoryService))();
    const mockBase62UrlConversionService: IUrlConvertor = new (td.constructor(Base62UrlConversionService))();
    const urlService = new UrlService(mockUrlRepoService, mockBase62UrlConversionService);

    const testURL: IURL = {
        code: '1000000',
        originalUrl: `https://mywebiste.com/6462e4262ffe276a33f78def#/metrics/replicaSet/6462e4bf5caa6659115c92e1/explorer/test/`,
        shortUrl: `https://aud.io/1000000`
    }

    it('should create short url successfully', async () => {
        td.when(mockUrlRepoService.find({ originalUrl: testURL.originalUrl }))
            .thenResolve(null);
        td.when(mockBase62UrlConversionService.getShortUrlCode(testURL.originalUrl))
            .thenResolve(testURL.code);

        const response = await urlService.createShortUrl(testURL.originalUrl);

        expect(response).to.not.be.undefined;
        expect(response.code).to.equal(testURL.code);
        expect(response.shortUrl.indexOf(testURL.code)).greaterThan(-1);
    });

    it('should return existing url successfully', async () => {
        td.when(mockUrlRepoService.find({ originalUrl: testURL.originalUrl }))
            .thenResolve(testURL);
        td.verify(mockBase62UrlConversionService.getShortUrlCode(testURL.originalUrl), {times: 0});

        const response = await urlService.createShortUrl(testURL.originalUrl);

        expect(response).to.not.be.undefined;
        expect(response.code).to.equal(testURL.code);
        expect(response.shortUrl.indexOf(testURL.code)).greaterThan(-1);
    });

    it('should get original url successfully', async () => {
        td.when(mockUrlRepoService.find({ code: testURL.code }))
            .thenResolve(testURL);

        const response = await urlService.getOriginalUrl(testURL.code);

        expect(response).to.not.be.undefined;
        expect(response).to.equal(testURL.originalUrl);
    });

    it('should return undefined if original url not found against code', async () => {
        td.when(mockUrlRepoService.find({ code: testURL.code }))
            .thenResolve(null);

        const response = await urlService.getOriginalUrl(testURL.code);

        expect(response).to.equal(undefined);
    });

}) 