import { posix } from 'path'

// redefine to only be strings
export const join = ( ...args: string[] ) => posix.join( ...args )
