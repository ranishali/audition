import { Schema, model as mongooseModel, Model } from 'mongoose';
import { IRepository, ISeed } from '../models';

/**
 * Repository class for Seed table.
 * It provides basic CRUD operations
 * Seed is used to convert that base10 number to equivalent base62 number.
 * Transactional and persistent to make it atomic across multiple requests and server restart.
 */
export class MongoSeedRepositoryService implements IRepository<ISeed> {
    private mongoSeedModel;

    private mongoSeedSchema = new Schema<ISeed>({
        counter: { type: Number, required: true },
        version: { type: Number, required: true }
    });

    // base10 number that has equivalent 7 digit minimm base62 number 
    private SEED: number = 56800235584;

    constructor(name: string) {
        name = name || 'seed';
        this.mongoSeedModel = mongooseModel<ISeed>(name, this.mongoSeedSchema);
    }

    public async create(model: ISeed): Promise<ISeed> {
        const record = new this.mongoSeedModel(model);
        return await record.save();
    }

    public async update(model: ISeed): Promise<ISeed> {
        await this.mongoSeedModel.updateOne({ version: { $eq:  model.version - 1 } }, model);
        return model;
    }

    public async delete(model: ISeed): Promise<ISeed> {
        await this.mongoSeedModel.deleteOne({});
        return model;
    }

    public async find(model: Partial<ISeed>): Promise<ISeed | null> {
        let result: ISeed | null = null;
        const session = await this.mongoSeedModel.startSession();

        try {
            session.startTransaction();
            const seedRecord: ISeed | null = await this.mongoSeedModel.findOne({}).session(session);
            if (seedRecord) {
                result = await this.update({ counter: seedRecord.counter + 1, version: seedRecord.version + 1 });
            } else {
                const response = await this.create({ counter: this.SEED, version: 0 });
                result = <any>response;
            }
            await session.commitTransaction();
            await session.endSession();
            return result;
        } catch (error) {
            await session.abortTransaction();
        }
        finally {
            await session.endSession();
        }
        return result;
    }
}