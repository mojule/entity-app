"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPagination = void 0;
const h_1 = require("../../../dom/h");
const util_1 = require("../../../dom/util");
const nav_1 = require("../../templates/nav");
const style = util_1.css `
  .pagination {
    background: #fff;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: 0 1rem;
    max-width: 100%;
    margin: auto;
  }

  .pagination_prev, .pagination_next {
    white-space: nowrap;
    display: inline;
    overflow: hidden;
    max-width: 100%;
    padding: 0;
  }

  .pagination_prev {
    margin-left: auto;
  }

  .pagination_next {
    margin-right: auto;
  }

  .pagination_next {
    direction: rtl;
    text-align: right;
  }

  .pagination li,
  .pagination span,
  .pagination a {
    display: inline;
    white-space: nowrap;
  }
`;
const createPagination = ({ path, total, start, count }) => {
    if (path.endsWith('/'))
        path = path.slice(0, -1);
    if (count < 0)
        count = total;
    const pageCount = Math.ceil(total / count);
    const currentPageIndex = Math.floor(start / count);
    const prevPageIndex = currentPageIndex - 1;
    const nextPageIndex = currentPageIndex + 1;
    const showSizes = [
        10, 25, 50, 100
    ];
    const showLinks = [];
    showSizes.forEach(size => {
        if (size < total) {
            showLinks.push({
                uri: `${path}/${start}/${size}`,
                content: String(size)
            });
        }
    });
    showLinks.push({
        uri: `${path}/0/-1`,
        content: String(total)
    });
    const show = h_1.div({
        class: 'pagination_show'
    }, util_1.css `
      .pagination_show {
        background: #fff;
      }

      .pagination_show nav, .pagination_show ul {
        margin: 0;
      }

      .pagination_show nav ul {
        justify-content: center;
      }
    `, nav_1.linksNav({
        content: 'Show'
    }, ...showLinks));
    const prev = {
        content: 'Page'
    };
    const padPageNumber = (i) => {
        const page = String(i + 1);
        const padLength = String(pageCount).length;
        return page.padStart(padLength - page.length, '\u2007');
    };
    const indexToPageLink = (i) => {
        const start = i * count;
        const link = {
            uri: `${path}/${start}/${count}`,
            content: padPageNumber(i)
        };
        return link;
    };
    const prevGroup = [];
    let currentGroup = [];
    const nextGroup = [];
    prevGroup.push(prev);
    if (prevPageIndex >= 0) {
        currentGroup.push(indexToPageLink(prevPageIndex));
        for (let i = 0; i < prevPageIndex; i++) {
            prevGroup.push(indexToPageLink(i));
        }
    }
    if (prevGroup.length > 1)
        currentGroup = [{ content: '…' }, ...currentGroup];
    currentGroup.push(indexToPageLink(currentPageIndex));
    if (nextPageIndex < pageCount) {
        currentGroup.push(indexToPageLink(nextPageIndex));
        for (let i = nextPageIndex + 1; i < pageCount; i++) {
            nextGroup.push(indexToPageLink(i));
        }
    }
    if (nextGroup.length) {
        currentGroup.push({ content: '…' });
    }
    const pagination = h_1.div({ class: 'pagination' }, style, util_1.decorateAttributes({ class: 'pagination_prev' }, nav_1.linksNav(...prevGroup)), util_1.decorateAttributes({ class: 'pagination_current' }, nav_1.linksNav(...currentGroup)), util_1.decorateAttributes({ class: 'pagination_next' }, nav_1.linksNav(...nextGroup.reverse())));
    return { show, pagination };
};
exports.createPagination = createPagination;
//# sourceMappingURL=pagination.js.map