import { ElementAttributes, StrictSelect } from './types';
export declare const emptyElement: (el: Element) => void;
export declare const attr: (el: Element, ...attributeRecords: ElementAttributes[]) => void;
export declare const strictSelect: StrictSelect;
export declare const decorateData: (data: Record<string, string>, ...els: HTMLElement[]) => DocumentFragment;
export declare const decorateAttributes: (attr: Record<string, string>, ...els: HTMLElement[]) => DocumentFragment;
export declare const unwrap: (el: HTMLElement) => void;
export declare const css: (strings: TemplateStringsArray, ...keys: string[]) => HTMLStyleElement;
