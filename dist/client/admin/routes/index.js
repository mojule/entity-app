"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecondaryRoute = exports.createRootRoute = void 0;
const entity_navigation_1 = require("../templates/entity-navigation");
const header_content_1 = require("../templates/header-content");
const h_1 = require("../../utils/h");
const error_1 = require("../../templates/error");
const createRootRoute = (entityCategories) => {
    const route = {
        method: 'get',
        path: '/',
        handlers: [
            (_req, res) => {
                res.send(h_1.fragment(entity_navigation_1.entityNavigation(entityCategories)));
            }
        ]
    };
    return route;
};
exports.createRootRoute = createRootRoute;
const createSecondaryRoute = (entityCategories, entitySchema, headerContent = header_content_1.defaultHeaderContent) => {
    const route = {
        method: 'get',
        path: `/:entityCategory`,
        handlers: [
            (req, res) => {
                const entityCategory = req.params.entityCategory;
                if (typeof entityCategory !== 'string') {
                    res.send(error_1.error(Error('Expected parameter "entityCategory" to be string')));
                    return;
                }
                if (!(entityCategory in entityCategories)) {
                    res.send(error_1.error(Error(`Expected ${entityCategory} in entityCategories`)));
                    return;
                }
                res.send(h_1.fragment(entity_navigation_1.entityNavigation(entityCategories, headerContent, entitySchema, entityCategory)));
            }
        ]
    };
    return route;
};
exports.createSecondaryRoute = createSecondaryRoute;
//# sourceMappingURL=index.js.map