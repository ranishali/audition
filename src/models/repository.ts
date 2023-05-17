export interface IRepository<M> {
    create(model: M): Promise<M>;
    update(model: M): Promise<M>;
    delete(model: M): Promise<M>;
    find(model: Partial<M>): Promise<M | null>;
}