import { ObjectMap } from '../util/types'

export type H = {
  [ key in keyof HTMLElementTagNameMap ]: CreateTag<key>
} & {
  element: CreateElement
  fragment: ( ...childNodes: NodeOrString[] ) => DocumentFragment
  text: ( content?: string ) => Text
}

export interface CreateElement {
  <K extends keyof HTMLElementTagNameMap>(
    name: K
  ): HTMLElementTagNameMap[ K ]
  <E extends HTMLElement = HTMLElement>(
    name: string
  ): E
  <K extends keyof HTMLElementTagNameMap>(
    name: K, attributes: ObjectMap<string>
  ): HTMLElementTagNameMap[ K ]
  <E extends HTMLElement = HTMLElement>(
    name: string, attributes: ObjectMap<string>
  ): E
  <K extends keyof HTMLElementTagNameMap>(
    name: K, ...childNodes: NodeOrString[]
  ): HTMLElementTagNameMap[ K ]
  <E extends HTMLElement = HTMLElement>(
    name: string, ...childNodes: NodeOrString[]
  ): E
  <K extends keyof HTMLElementTagNameMap>(
    name: K, attributes: ObjectMap<string>, ...childNodes: NodeOrString[]
  ): HTMLElementTagNameMap[ K ]
  <E extends HTMLElement = HTMLElement>(
    name: string, attributes: ObjectMap<string>, ...childNodes: NodeOrString[]
  ): E
}

export interface CreateTag<T extends keyof HTMLElementTagNameMap> {
  ( ...childNodes: NodeOrString[] ): HTMLElementTagNameMap[ T ]
  ( attributes: ObjectMap<string> ): HTMLElementTagNameMap[ T ]
  (
    attributes: ObjectMap<string>,
    ...childNodes: NodeOrString[]
  ): HTMLElementTagNameMap[ T ]
}

export type NodeOrString = Node | string

export interface StrictSelect {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K, parent?: ParentNode
  ): HTMLElementTagNameMap[ K ]
  <E extends HTMLElement = HTMLElement>(
    selectors: string, parent?: ParentNode
  ): E
}