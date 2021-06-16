import { refFactory } from '../ref'

const createRef = refFactory( '#' )

export const fileRefSchema = createRef( 'file' )
export const imageFileRefSchema = createRef( 'imageFile' )
export const zipFileRefSchema = createRef( 'zipFile' )