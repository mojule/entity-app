import { DbLoad, DbLoadMany, DbCreate, DbCreateMany, DbSave, DbSaveMany, DbRemove, DbRemoveMany, DbItem } from './types';
export declare const defaultCreateMany: <TEntity>(create: DbCreate<TEntity>) => DbCreateMany<TEntity>;
export declare const defaultLoadMany: <TEntity, D extends DbItem = DbItem>(load: DbLoad<TEntity, D>) => DbLoadMany<TEntity, D>;
export declare const defaultSaveMany: <TEntity>(save: DbSave<TEntity>) => DbSaveMany<TEntity>;
export declare const defaultRemoveMany: (remove: DbRemove) => DbRemoveMany;
