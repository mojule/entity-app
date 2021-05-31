import { ObjectMap } from '../../util/types';
import { SpaResponse } from '@mojule/spa-router';
export interface DocumentTargets extends ObjectMap<HTMLElement> {
    main: HTMLElement;
}
export declare type EntityTemplates<TEntityMap> = {
    [key in keyof TEntityMap]: EntityTemplate<TEntityMap[key]>;
};
export declare type EntityTemplate<TEntity> = (model: TEntity) => Node;
export declare type OnCreateSubmit<TEntityMap> = (form: HTMLFormElement, entityKey: keyof TEntityMap & string, categorySlug: string, res: SpaResponse<DocumentFragment>) => Promise<void>;
