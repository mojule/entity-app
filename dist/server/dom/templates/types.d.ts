import { H } from '../../../dom/types';
export interface TemplateDependencies {
    document: Document;
    h: H;
    includeResolver: IncludeResolver;
}
export declare type IncludeResolver = (id: string) => string;
