export const errorToObj = ( err: Error, includeStack = false ): ErrorObj => {
  const {
    name = 'Error',
    message = 'An unknown error occurred',
    stack = ''
  } = err

  if ( includeStack ) return { name, message, stack }

  return { name, message }
}

export interface ErrorObj {
  name: string
  message: string
  stack?: string
}

export const objToError = ( obj: ErrorObj ) => {
  const {
    name = 'Error',
    message = 'An unknown error occurred',
    stack = ''
  } = obj

  const err = Error( message )

  err.name = name
  err.stack = stack

  return err
}
