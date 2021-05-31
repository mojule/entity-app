import { getEntries, entriesToPointers } from '@mojule/schema-forms'
import { expand } from '@mojule/json-pointer'

export const getData = ( form: HTMLFormElement ) => {
  const entries = getEntries( form, false )
  const pointers = entriesToPointers( entries )
  const map: any = {}

  pointers.forEach( ( [ pointer, value ] ) => {
    map[ pointer ] = value
  } )

  return expand( map )
}
