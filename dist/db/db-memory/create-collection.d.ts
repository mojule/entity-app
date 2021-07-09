import { ObjectMap } from '@mojule/util';
import { DbItem, DbCollection } from '../types';
export declare const createCollection: <TEntity, D extends DbItem>(collection: ObjectMap<TEntity & D>, createDbItem: () => D) => DbCollection<TEntity, D>;
