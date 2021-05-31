import { JSDOM } from 'jsdom';
import { StrictSelect } from '../../dom/types';
export declare const createDom: (html?: string) => JSDOM;
export declare const document: Document;
export declare const fragment: typeof JSDOM.fragment;
export declare const strictSelect: StrictSelect;
