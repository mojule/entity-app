import { fragment, h1, p, pre } from '../../utils/h'

export const error = ( model: Error ) =>
  fragment(
    h1( model.name || 'Error' ),
    p( model.message || 'Unknown error' ),
    pre( model.stack || '' )
  )
