import { DbLoad, DbLoadMany, DbCreate, DbCreateMany, DbSave, DbSaveMany, DbRemove, DbRemoveMany } from './types';
export declare const defaultCreateMany: <TEntity>(create: DbCreate<TEntity>) => DbCreateMany<TEntity>;
export declare const defaultLoadMany: <TEntity>(load: DbLoad<TEntity>) => DbLoadMany<TEntity>;
export declare const defaultSaveMany: <TEntity>(save: DbSave<TEntity>) => DbSaveMany<TEntity>;
export declare const defaultRemoveMany: (remove: DbRemove) => DbRemoveMany;
