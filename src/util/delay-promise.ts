export const delayPromise = ( ms: number ) => new Promise<void>(
  resolve => setTimeout( resolve, ms )
)
