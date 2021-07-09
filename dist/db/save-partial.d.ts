import { DbCollectionRead, DbItem } from './types';
export declare const createApplyPartial: <TEntity, D extends DbItem>(collection: DbCollectionRead<TEntity, D>) => (entity: Partial<TEntity> & DbItem) => Promise<TEntity & D>;
