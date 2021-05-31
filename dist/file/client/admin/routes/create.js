"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntityCreateRouteWithFiles = void 0;
const file_category_1 = require("../../../entity/file-category");
const get_data_1 = require("../../../../client/forms/get-data");
const header_content_1 = require("../../../../client/admin/templates/header-content");
const create_1 = require("../../../../client/admin/routes/entity/create");
const lodash_1 = require("../../../../util/lodash");
const error_1 = require("../../../../client/templates/error");
const createEntityCreateRouteWithFiles = (db, entityCategories, entityCreateSchemas, commonSchemas = {}, headerContent = header_content_1.defaultHeaderContent, onCreateSubmit = create_1.createDefaultOnCreateSubmit(db)) => {
    const onCreateSubmitFile = async (form, entityKey, categorySlug, res) => {
        const key = entityKey;
        if (!file_category_1.fileEntityCategory.keys.includes(key)) {
            return onCreateSubmit(form, entityKey, categorySlug, res);
        }
        const entityTypeSlug = lodash_1.kebabCase(entityKey);
        try {
            const fileInput = form.elements.namedItem('file');
            if (!(fileInput instanceof HTMLInputElement))
                throw Error('Expected an HTMLInputElement named file');
            const { files } = fileInput;
            if (files === null || files.length !== 1)
                throw Error('Expected HTMLInputElement to contain a single file');
            const data = get_data_1.getData(form);
            const { tags = [] } = data;
            const formData = new FormData();
            formData.append('file', files[0]);
            tags.forEach(tag => formData.append('tags[]', tag));
            await fetch(`/api/v1/${entityKey}/create`, {
                method: 'POST',
                body: formData
            });
        }
        catch (err) {
            res.send(error_1.error(err));
            return;
        }
        res.redirect(`/list/${categorySlug}/${entityTypeSlug}`);
    };
    const route = create_1.createEntityCreateRoute(db, entityCategories, entityCreateSchemas, commonSchemas, headerContent, onCreateSubmitFile);
    return route;
};
exports.createEntityCreateRouteWithFiles = createEntityCreateRouteWithFiles;
//# sourceMappingURL=create.js.map