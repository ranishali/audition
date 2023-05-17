export interface IUrlConvertor {
    getShortUrlCode(url: string): Promise<string>;
}