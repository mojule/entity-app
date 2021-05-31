import { EntitySchemaMap } from '../../../schema/types';
import { EntityCategories } from '../../../entity/types';
import { NodeOrString } from '../../../dom/types';
export declare const entityNavigation: <TEntityMap, TEntityCategories extends EntityCategories<TEntityMap>>(entityCategories: TEntityCategories, headerContent?: NodeOrString, entitySchema?: import("../../../util/types").KeyValueMap<TEntityMap, import("../../../schema/types").IdSchema> | undefined, entityCategory?: (keyof TEntityCategories & string) | undefined) => HTMLDivElement;
export declare const primaryEntityNavigation: <TEntityMap>(headerContent: NodeOrString, entityCategories: EntityCategories<TEntityMap>) => HTMLDivElement;
export declare const secondaryEntityNavigation: <TEntityMap>(entitySchema: import("../../../util/types").KeyValueMap<TEntityMap, import("../../../schema/types").IdSchema>, entityCategorySlug: string, keys: (keyof TEntityMap)[]) => HTMLDivElement;
export declare const defaultCreateEntityHeader: <TEntityMap, TEntityCategories extends EntityCategories<TEntityMap>>(entityCategories: TEntityCategories, headerContent: NodeOrString | undefined, title: string, entitySchema?: import("../../../util/types").KeyValueMap<TEntityMap, import("../../../schema/types").IdSchema> | undefined, entityCategory?: (keyof TEntityCategories & string) | undefined) => HTMLDivElement[];
