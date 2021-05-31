import { ObjectMap } from '../../../util/types';
import { DbItem, DbCollection } from '../../types';
export declare const createCollection: <TEntity>(collection: ObjectMap<TEntity & DbItem>) => DbCollection<TEntity>;
