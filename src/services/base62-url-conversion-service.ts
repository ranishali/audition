import { IRepository, ISeed, IUrlConvertor } from "../models";

/**
 * A class that returns the short url code for the long/original Url.
 * Short url code will have [0-9A-Za-z] characters which in total is 62, hence using base62 conversion.
 * It keeps a counter (base10) internally, increments it and converts it to base62 everytime a request is made
 * It will start with code generate as 0000001, 0000002 and so on 0000000Z, 000001Z...
 */
export class Base62UrlConversionService implements IUrlConvertor {

    // possible characters for base62
    private base62String = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    constructor(private seedRepositoryService: IRepository<ISeed>) {
    }

    public async getShortUrlCode(_url: string): Promise<string> {
        let seed = await this.seedRepositoryService.find({})
            .catch((error) => console.error(`unable to find seed: ${error.message}`));
        if (seed) {
            let shortenUrlCode = '';
            let seedCounter = seed?.counter;

            while (seedCounter) {
                shortenUrlCode = this.base62String[seedCounter % 62] + shortenUrlCode;
                seedCounter = Math.floor(seedCounter / 62);
            }
            return shortenUrlCode;
        }
        return "";
    }
}