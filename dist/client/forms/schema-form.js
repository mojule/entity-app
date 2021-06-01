"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaForm = exports.createFormEls = void 0;
const schema_forms_1 = require("@mojule/schema-forms");
const dedupe_fieldsets_1 = require("./dedupe-fieldsets");
const decorate_form_icons_1 = require("./decorate-form-icons");
const lodash_1 = require("../../util/lodash");
const h_1 = require("../../dom/h");
const templates = schema_forms_1.ClientFormTemplates(document, Event);
exports.createFormEls = schema_forms_1.SchemaToFormElements(templates);
const createSchemaForm = (schema, title, value) => {
    const action = value === undefined ? 'create' : 'update';
    const formEls = exports.createFormEls(schema, undefined, value);
    const submit = h_1.button({ 'data-action': action }, `${lodash_1.startCase(action)} ${title}`);
    const entityForm = h_1.form({ class: 'entity-form' }, formEls, submit);
    dedupe_fieldsets_1.dedupeFieldsets(entityForm);
    decorate_form_icons_1.decorateFormIcons(entityForm);
    entityForm.addEventListener('input', () => {
        decorate_form_icons_1.decorateFormIcons(entityForm);
    });
    return entityForm;
};
exports.createSchemaForm = createSchemaForm;
//# sourceMappingURL=schema-form.js.map