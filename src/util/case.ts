import { kebabCase } from './lodash'

export const dotCase = ( s: string ) => kebabCase( s ).replace( /\-/g, '.' )
