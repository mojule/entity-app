import { ClientFormTemplates, SchemaToFormElements } from '@mojule/schema-forms'
import { IdSchema } from '../../schema/types'
import { dedupeFieldsets } from './dedupe-fieldsets'
import { decorateFormIcons } from './decorate-form-icons'
import { startCase } from '../../util/lodash'
import { button, form } from '../../dom/h'

const templates = ClientFormTemplates( document, Event )

export const createFormEls = SchemaToFormElements( templates )

export const createSchemaForm = (
  schema: IdSchema,
  title: string,
  value?: any
) => {
  const action = value === undefined ? 'create' : 'update'

  const formEls = createFormEls( schema, undefined, value )

  const submit = button(
    { 'data-action': action },
    `${ startCase( action ) } ${ title }`
  )

  const entityForm = form(
    { class: 'entity-form' },
    formEls,
    submit
  )

  dedupeFieldsets( entityForm )
  decorateFormIcons( entityForm )

  entityForm.addEventListener( 'input', () => {
    decorateFormIcons( entityForm )
  } )

  return entityForm
}
