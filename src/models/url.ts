export interface IURL {
    originalUrl: string;
    shortUrl: string;
    code: string;

    /* more fields to add later on to improve for insights, performamce e.g. below fields
       these fields can be utilized for different purpose
       - implement cache
       - remove links which are not in use for long time
    */

    // noOfClicks: number;
    // lastClick: DateTime;
    // DateCreated: DateTime;
    
}