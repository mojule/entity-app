import { cursorStates } from './consts'

export type ElementAttributes = Record<string,any> & {
  style?: string | Partial<CSSStyleDeclaration> 
}

export type SArg = SVGElement | string | ElementAttributes

export type HArg = Node | string | ElementAttributes

export interface StrictSelect {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K, el?: ParentNode
  ): HTMLElementTagNameMap[K]
  <K extends keyof SVGElementTagNameMap>(
    selectors: K, el?: ParentNode
  ): SVGElementTagNameMap[K]
  <E extends Element = Element>(
    selectors: string, el?: ParentNode
  ): E
}

export type CursorStates = typeof cursorStates[ number ]

export type CreateTag<K extends keyof HTMLElementTagNameMap> = 
  ( ...args: HArg[] ) => HTMLElementTagNameMap[ K ]

