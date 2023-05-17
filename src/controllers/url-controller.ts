import { UrlService } from "../services";

export class UrlController {
    constructor(private urlService: UrlService) {
    }

    public async postUrl(longUrl: string): Promise<any> {
        try {
            return await this.urlService.createShortUrl(longUrl);
        } catch (error) {
            console.error(`PostUrl failed: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    public async getLongUrl(shortUrlCode: string): Promise<string | undefined> {
        try {
            return await this.urlService.getOriginalUrl(shortUrlCode);
        } catch (error) {
            console.error(`getLongUrl failed: ${error}`);
            throw error;
        }
    }
}