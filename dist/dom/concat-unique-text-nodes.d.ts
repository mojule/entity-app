import { CreateTag } from './types';
export declare const concatUniqueTextNodes: (...elements: HTMLElement[]) => string;
export declare type CatableElement = HTMLScriptElement | HTMLStyleElement;
export declare type CatableElements = CatableElement[];
export declare type CatableWrapper = CreateTag<'style'> | CreateTag<'script'>;
export declare const concatAndMove: (wrapper: CatableWrapper, target: HTMLElement, ...elements: CatableElements) => void;
export declare const concatAndMoveCss: (wrapper: CatableWrapper, target: HTMLElement, ...elements: CatableElements) => void;
