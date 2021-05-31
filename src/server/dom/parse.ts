import { fragment, createDom } from ".";

export const parseFirst = ( html: string ) => fragment( html ).firstChild

export const parseFragment = ( html: string ) => fragment( html )

export const parseDocument = ( html: string ) => {
  const dom = createDom( html )

  return dom.window.document
}
