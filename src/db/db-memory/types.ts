import { DbItem } from '../types'

export type CreateDbItem<D extends DbItem = DbItem> = () => D