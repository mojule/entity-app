import { CreateTag } from './types'

export const Css = ( style: CreateTag<'style'> ) => {
  const css = ( strings: TemplateStringsArray, ...keys: string[] ) =>
    style(
      strings.map( ( s, i ) => s + ( keys[ i ] || '' ) ).join( '' )
    )

  return css
}
