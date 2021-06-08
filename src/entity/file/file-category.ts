import { EntityCategory } from '../types'
import { FileEntityMap } from './types'

export const fileEntityCategory: EntityCategory<FileEntityMap> = {
  title: 'Files',
  keys: [ 'file', 'imageFile', 'zipFile' ]
}