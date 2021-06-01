import { ImageFileEntity } from '../../entity'
import { div, h1, p, img } from '../../../dom/h'
import { css } from '../../../dom/util'

export const imageFile = ( model: ImageFileEntity ) => {
  const { meta, name } = model
  const { size, width, height, path } = meta

  const node = div(
    { class: 'image-file-entity' },
    css`
      .image-file-entity {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .image-file-entity h1 {
        font-size: 0.9rem;
        width: 100%;
        margin-bottom: auto;
      }

      .image-file-entity img {
        background: #f0f0f0;
        display: block;
        width: 10rem;
        height: 10rem;
        object-fit: scale-down;
        object-position: 50% 50%;
        margin: 1rem auto;
      }

      .image-file-entity p {
        font-size: 0.8rem;
        margin: 0;
        padding-bottom: 0.25rem;
      }
    `,
    h1( { title: name }, name ),
    img( { src: path } ),
    p( `${ width.toLocaleString() } × ${ height.toLocaleString() }` ),
    p( `${ size.toLocaleString() } bytes` )
  )

  return node
}
