import { ClientRoute } from '../types';
import { EntitySchemaMap, SchemaMap } from '../../../../schema/types';
import { EntityDb } from '../../../../db/types';
import { EntityCategories } from '../../../../entity/types';
export declare const createEntityEditRoute: <TEntityMap>(db: EntityDb<TEntityMap>, entityCategories: EntityCategories<TEntityMap>, entityEditSchemas: import("../../../../util/types").KeyValueMap<TEntityMap, import("../../../../schema/types").IdSchema>, commonSchemas?: SchemaMap, headerContent?: HTMLHeadingElement) => ClientRoute<any>;
