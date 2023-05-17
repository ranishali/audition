import { Schema, model } from 'mongoose';
import { IRepository, IURL } from '../models';

/**
 * Repository class for URL table.
 * It provides basic CRUD operations
 */
export class MongoURLRepositoryService implements IRepository<IURL> {
    private mongoURLModel;
    
    private mongoURLSchema = new Schema<IURL>({
        code: { type: String, required: true },
        originalUrl: { type: String, required: true },
        shortUrl: { type: String, required: true }
    });

    constructor(name: string) {
        name = name || 'url';
        this.mongoURLModel = model<IURL>(name, this.mongoURLSchema);
    }

    public async create(model: IURL): Promise<IURL> {
        const record = new this.mongoURLModel(model);
        return await record.save();
    }

    public async update(model: IURL): Promise<IURL> {
        throw new Error('Method not implemented.');
    }

    public async delete(model: IURL): Promise<IURL> {
        throw new Error('Method not implemented.');
    }

    public async find(model: Partial<IURL>): Promise<IURL | null> {
        const response = await this.mongoURLModel.findOne(model);
        return <any>response;
    }
}