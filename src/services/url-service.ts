import dotenv from 'dotenv';

import { IRepository, IURL, IUrlConvertor } from "../models";

dotenv.config();

export class UrlService {
    constructor(private repositoryService: IRepository<IURL>, private urlConvertor: IUrlConvertor) {

    }
    public async createShortUrl(longUrl: string): Promise<IURL> {
        const url: IURL | null = await this.repositoryService.find({ originalUrl: longUrl });
        if (url) {
            return url;
        } else {
            const code: string = await this.urlConvertor.getShortUrlCode(longUrl);
            const shortUrl = `${process.env.WEBSITE_URL}/${code}`;

            const url: IURL = {
                originalUrl: longUrl,
                shortUrl,
                code
            }
            await this.repositoryService.create(url);
            return url;
        }
    }

    public async getOriginalUrl(shortUrlCode: string): Promise<string | undefined> {
        const url: IURL | null = await this.repositoryService.find({ code: shortUrlCode });
        if (url) {
            return url.originalUrl;
        } else return undefined;
    }
}