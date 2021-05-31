import { EntityCategory } from '../../entity/types'
import { FileEntityMap } from './types'

export const fileEntityCategory: EntityCategory<FileEntityMap> = {
  title: 'Files',
  keys: [ 'file', 'imageFile', 'zipFile' ]
}