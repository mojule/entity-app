"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntityListRoute = void 0;
const ref_1 = require("../../../../db/ref");
const h_1 = require("../../../utils/h");
const error_1 = require("../../../templates/error");
const targeted_els_1 = require("../../templates/targeted-els");
const pagination_1 = require("../../templates/pagination");
const entity_cards_1 = require("../../templates/entity-cards");
const header_content_1 = require("../../templates/header-content");
const lodash_1 = require("../../../../util/lodash");
const header_title_1 = require("../../../css/header-title");
const defaultEntityPredicate = () => true;
const createEntityListRoute = (db, entityCategories, entitySchema, templates, createEntityHeader, headerContent = header_content_1.defaultHeaderContent, filter = defaultEntityPredicate) => {
    const route = {
        method: 'get',
        path: `/list/:entityCategory/:entityType/:start?/:count?`,
        handlers: [
            async (req, res) => {
                if (typeof req.params.entityType !== 'string')
                    return res.send(error_1.error(Error('Expected entityType parameter to be string')));
                if (typeof req.params.entityCategory !== 'string')
                    return res.send(error_1.error(Error('Expected entityCategory parameter to be string')));
                const typeSlug = req.params.entityType;
                const entityKey = lodash_1.camelCase(typeSlug);
                const categorySlug = req.params.entityCategory;
                const entityCategory = lodash_1.camelCase(categorySlug);
                let count = -1;
                if (req.params.count === undefined) {
                    const savedCount = localStorage.getItem(`/list/${categorySlug}/${typeSlug}/count`);
                    count = savedCount !== null ? Number(savedCount) : 10;
                }
                else {
                    count = Number(req.params.count);
                }
                if (req.params.start === undefined) {
                    return res.redirect(`/list/${categorySlug}/${typeSlug}/0/${count}`);
                }
                const start = Number(req.params.start);
                const collection = db.collections[entityKey];
                localStorage.setItem(`/list/${categorySlug}/${typeSlug}/count`, String(count));
                try {
                    const schema = entitySchema[entityKey];
                    const template = templates[entityKey];
                    const title = schema['title'] || lodash_1.startCase(entityKey);
                    const allEntities = await collection.loadMany(await collection.ids());
                    const dbEntities = allEntities.filter(e => filter(e, entityKey)).reverse();
                    if (count < 0)
                        count = dbEntities.length;
                    const resolvedEntities = await Promise.all(dbEntities.slice(start, start + count).map(d => ref_1.resolveRefsShallow(db, d)));
                    const { show, pagination } = pagination_1.createPagination({
                        path: `#/list/${categorySlug}/${typeSlug}`,
                        total: dbEntities.length,
                        start,
                        count
                    });
                    const header = [
                        ...createEntityHeader(entityCategories, headerContent, title, entitySchema, entityCategory)
                    ];
                    if (resolvedEntities.length > 0) {
                        header.push(show);
                    }
                    const footer = [];
                    if (dbEntities.length > count) {
                        footer.push(pagination);
                    }
                    const cards = [];
                    const entityCardsModel = {
                        title,
                        createEntityPath: `#/create/${categorySlug}/${typeSlug}`,
                        entityCardModels: cards
                    };
                    resolvedEntities.forEach(entity => {
                        const id = entity._id;
                        const entityView = template(entity);
                        const editPath = `#/edit/${categorySlug}/${typeSlug}/${id}`;
                        const removePath = `#/remove/${categorySlug}/${typeSlug}/${id}`;
                        const viewPath = `#/view/${categorySlug}/${typeSlug}/${id}`;
                        const cardModel = {
                            id, entityView, editPath, removePath, viewPath
                        };
                        cards.push(cardModel);
                    });
                    const content = h_1.fragment(header_title_1.headerTitleStyle, targeted_els_1.headerEls(...header), entity_cards_1.entityCards(entityCardsModel), targeted_els_1.footerEls(...footer));
                    res.send(content);
                }
                catch (err) {
                    res.send(error_1.error(err));
                }
            }
        ]
    };
    return route;
};
exports.createEntityListRoute = createEntityListRoute;
//# sourceMappingURL=list.js.map