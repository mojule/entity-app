"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntityEditRoute = void 0;
const header_content_1 = require("../../templates/header-content");
const lodash_1 = require("../../../../util/lodash");
const schema_form_1 = require("../../../forms/schema-form");
const entity_navigation_1 = require("../../templates/entity-navigation");
const h_1 = require("../../../../dom/h");
const targeted_els_1 = require("../../templates/targeted-els");
const header_title_1 = require("../../../css/header-title");
const entity_form_1 = require("../../../css/entity-form");
const error_1 = require("../../../templates/error");
const get_data_1 = require("../../../forms/get-data");
const resolver_1 = require("../../../../schema/resolve/resolver");
const createEntityEditRoute = (db, entityCategories, entityEditSchemas, commonSchemas = {}, headerContent = header_content_1.defaultHeaderContent) => {
    const route = {
        method: 'get',
        path: `/edit/:entityCategory/:entityType/:id`,
        handlers: [
            async (req, res) => {
                if (typeof req.params.entityCategory !== 'string') {
                    return res.send(error_1.error(Error('Expected "entityCategory" parameter to be string')));
                }
                if (typeof req.params.entityType !== 'string') {
                    return res.send(error_1.error(Error('Expected "entityType" parameter to be string')));
                }
                if (typeof req.params.id !== 'string') {
                    return res.send(error_1.error(Error('Expected "id" parameter to be string')));
                }
                const id = req.params.id;
                const entityTypeSlug = req.params.entityType;
                const entityCategorySlug = req.params.entityCategory;
                const entityKey = lodash_1.camelCase(entityTypeSlug);
                const schema = await resolver_1.schemaResolver(db, entityKey, entityEditSchemas, commonSchemas);
                const title = schema['title'] || lodash_1.startCase(entityKey);
                const existing = await db.collections[entityKey].load(id);
                const entityForm = schema_form_1.createSchemaForm(schema, title, existing);
                entityForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    await onEditSubmit(entityForm, entityKey, entityCategorySlug, id, res);
                });
                const header = [
                    entity_navigation_1.entityNavigation(entityCategories, headerContent, entityEditSchemas, 'entity'),
                    h_1.h1({ class: 'header-title' }, `Update ${title}`)
                ];
                const content = h_1.fragment(header_title_1.headerTitleStyle, entity_form_1.entityFormStyle, targeted_els_1.headerEls(...header), entityForm);
                res.send(content);
            }
        ]
    };
    const onEditSubmit = async (form, entityKey, entityCategorySlug, id, res) => {
        const data = get_data_1.getData(form);
        const collection = db.collections[entityKey];
        const entityTypeSlug = lodash_1.kebabCase(entityKey);
        data._id = id;
        try {
            await collection.save(data);
        }
        catch (err) {
            res.send(error_1.error(err));
            return;
        }
        res.redirect(`/list/${entityCategorySlug}/${entityTypeSlug}`);
    };
    return route;
};
exports.createEntityEditRoute = createEntityEditRoute;
//# sourceMappingURL=edit.js.map