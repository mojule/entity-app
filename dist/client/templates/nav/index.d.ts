import { Link } from './types';
export declare const link: ({ content, uri: href }: Link) => HTMLSpanElement;
export declare const linksNav: (...model: Link[]) => HTMLElement;
export declare const linksUl: (...model: Link[]) => HTMLUListElement;
