export const createEperm = ( operation: string ) => 
  Error( `EPERM: operation not permitted, ${ operation }` )
