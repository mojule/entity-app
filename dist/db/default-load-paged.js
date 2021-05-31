"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLoadPaged = void 0;
const defaultLoadPaged = (ids, loadMany) => {
    const loadPaged = async (pageSize, pageIndex = 0) => {
        const entityIds = await ids();
        const start = pageIndex * pageSize;
        const end = start + pageSize;
        const pageIds = entityIds.slice(start, end);
        const entities = await loadMany(pageIds);
        return entities;
    };
    return loadPaged;
};
exports.defaultLoadPaged = defaultLoadPaged;
//# sourceMappingURL=default-load-paged.js.map