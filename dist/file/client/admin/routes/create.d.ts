import { FileEntityMap } from '../../../entity/types';
import { EntityDb } from '../../../../db/types';
import { EntityCategories } from '../../../../entity/types';
import { EntitySchemaMap, SchemaMap } from '../../../../schema/types';
import { OnCreateSubmit } from '../../../../client/admin/types';
export declare const createEntityCreateRouteWithFiles: <TEntityMap extends FileEntityMap>(db: EntityDb<TEntityMap>, entityCategories: EntityCategories<TEntityMap>, entityCreateSchemas: import("../../../../util/types").KeyValueMap<TEntityMap, import("../../../../schema/types").IdSchema>, commonSchemas?: SchemaMap, headerContent?: HTMLHeadingElement, onCreateSubmit?: OnCreateSubmit<TEntityMap>) => import("../../../..").ClientRoute<any>;
