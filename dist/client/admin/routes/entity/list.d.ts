import { EntityDb, DbItem } from '../../../../db/types';
import { EntityTemplates } from '../../types';
import { ClientRoute } from '../types';
import { EntitySchemaMap } from '../../../../schema/types';
import { EntityCategories } from '../../../../entity/types';
export declare type EntityPredicate<TEntityMap, TKey extends keyof TEntityMap = keyof TEntityMap> = (item: (TEntityMap[TKey] & DbItem), entityKey: TKey) => boolean;
export declare const createEntityListRoute: <TEntityMap, TTemplateMap extends TEntityMap>(db: EntityDb<TEntityMap>, entityCategories: EntityCategories<TEntityMap>, entitySchema: import("../../../../util/types").KeyValueMap<TEntityMap, import("../../../../schema/types").IdSchema>, templates: EntityTemplates<TTemplateMap>, createEntityHeader: (...args: any[]) => HTMLElement[], headerContent?: HTMLHeadingElement, filter?: EntityPredicate<TEntityMap, keyof TEntityMap>) => ClientRoute<any>;
