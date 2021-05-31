import { ClientRoute } from './types';
import { EntitySchemaMap } from '../../../schema/types';
import { EntityCategories } from '../../../entity/types';
export declare const createRootRoute: <TEntityMap, TEntityCategories extends EntityCategories<TEntityMap>>(entityCategories: TEntityCategories) => ClientRoute<any>;
export declare const createSecondaryRoute: <TEntityMap, TEntityCategories extends EntityCategories<TEntityMap>>(entityCategories: TEntityCategories, entitySchema: import("../../../util/types").KeyValueMap<TEntityMap, import("../../../schema/types").IdSchema>, headerContent?: HTMLHeadingElement) => ClientRoute<any>;
