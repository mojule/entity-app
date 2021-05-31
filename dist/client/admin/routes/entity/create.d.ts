import { ClientRoute } from '../types';
import { EntitySchemaMap, SchemaMap } from '../../../../schema/types';
import { EntityDb } from '../../../../db/types';
import { EntityCategories } from '../../../../entity/types';
import { OnCreateSubmit } from '../../types';
export declare const createEntityCreateRoute: <TEntityMap>(db: EntityDb<TEntityMap>, entityCategories: EntityCategories<TEntityMap>, entityCreateSchemas: import("../../../../util/types").KeyValueMap<TEntityMap, import("../../../../schema/types").IdSchema>, commonSchemas?: SchemaMap, headerContent?: HTMLHeadingElement, onCreateSubmit?: OnCreateSubmit<TEntityMap>) => ClientRoute<any>;
export declare const createDefaultOnCreateSubmit: <TEntityMap>(db: EntityDb<TEntityMap>) => OnCreateSubmit<TEntityMap>;
