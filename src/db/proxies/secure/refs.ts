import { refFactory } from '../../../schema/ref'

const createRef = refFactory( '#' )

export const secureUserRefSchema = createRef( 'user' )
export const secureGroupRefSchema = createRef( 'group' )

