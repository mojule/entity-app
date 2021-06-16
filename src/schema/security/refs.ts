import { refFactory } from '../ref'

const createRef = refFactory( '#' )

export const userRefSchema = createRef( 'user' )
