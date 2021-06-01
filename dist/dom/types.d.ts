import { cursorStates } from './consts';
export declare type ElementAttributes = Record<string, any> & {
    style?: string | Partial<CSSStyleDeclaration>;
};
export declare type SArg = SVGElement | string | ElementAttributes;
export declare type HArg = Node | string | ElementAttributes;
export interface StrictSelect {
    <K extends keyof HTMLElementTagNameMap>(selectors: K, el?: ParentNode): HTMLElementTagNameMap[K];
    <K extends keyof SVGElementTagNameMap>(selectors: K, el?: ParentNode): SVGElementTagNameMap[K];
    <E extends Element = Element>(selectors: string, el?: ParentNode): E;
}
export declare type CursorStates = typeof cursorStates[number];
export declare type CreateTag<K extends keyof HTMLElementTagNameMap> = (...args: HArg[]) => HTMLElementTagNameMap[K];
