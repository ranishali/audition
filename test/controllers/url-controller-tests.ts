import * as td from 'testdouble';
import { expect, assert } from 'chai';
import { UrlService } from '../../src/services';
import { UrlController } from '../../src/controllers/url-controller';
import { IURL } from '../../src/models';

describe('UrlController', () => {
    beforeEach(() => td.reset());

    const mockUrlService: UrlService = new (td.constructor(UrlService))();
    const urlController: UrlController = new UrlController(mockUrlService);

    const testURL: IURL = {
        code: 'ABC1234',
        originalUrl: `https://mywebiste.com/6462e4262ffe276a33f78def#/metrics/replicaSet/6462e4bf5caa6659115c92e1/explorer/test/`,
        shortUrl: `https://aud.io/ABC1234`
    }

    it('should post url successfully', async () => {
        td.when(mockUrlService.createShortUrl(td.matchers.anything()))
            .thenResolve(testURL);

        const response = await urlController.postUrl(testURL.originalUrl);

        expect(response).to.not.be.undefined;
        expect(response.shortUrl).to.equal(testURL.shortUrl);
        expect(response.originalUrl).to.equal(testURL.originalUrl);
        expect(response.code).to.equal(testURL.code);
    });

    it('should throw if service fails', async () => {
       td.when(mockUrlService.createShortUrl(td.matchers.anything()))
            .thenReject(new Error('some error occurred'));

        await urlController.postUrl(testURL.originalUrl)
            .then(() => assert.fail('should not pass'))
            .catch((error) => {
                expect(error.message).to.equal('some error occurred');
            });
    });

    it('should get long url successfully', async () => {
        td.when(mockUrlService.getOriginalUrl(testURL.code))
            .thenResolve(testURL.originalUrl);

        const response = await urlController.getLongUrl(testURL.code);

        expect(response).to.not.be.undefined;
        expect(response).to.equal(testURL.originalUrl);
    });

    it('should throw if service fails on get long url', async () => {
        td.when(mockUrlService.getOriginalUrl(testURL.code))
            .thenReject(new Error('some error occurred'));

        await urlController.getLongUrl(testURL.code)
            .then(() => assert.fail('should not pass'))
            .catch((error) => {
                expect(error.message).to.equal('some error occurred');
            });
    });
}) 