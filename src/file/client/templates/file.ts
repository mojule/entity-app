import { FileEntity } from '../../entity'
import { div, h1, p } from '../../../client/utils/h'
import { css } from '../../../client/utils/h/css'

export const file = ( model: FileEntity ) => {
  const { meta, name } = model
  const { size } = meta

  const node = div(
    { class: 'file-entity' },
    css`
      .file-entity {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .file-entity h1 {
        font-size: 0.9rem;
        margin-bottom: auto;
      }

      .file-entity p {
        font-size: 0.8rem;
      }
    `,
    h1( { title: name }, name ),
    p( `${ size.toLocaleString() } bytes` )
  )

  return node
}
