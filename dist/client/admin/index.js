"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = void 0;
const spa_router_1 = require("@mojule/spa-router");
const error_1 = require("../templates/error");
const hashChange = new Event('hashchange');
const createAdmin = (targets, routes, onSend = () => { }, onRedirect = () => { }) => {
    const { main } = targets;
    const targetKeys = Object.keys(targets);
    const send = (node) => {
        targetKeys.forEach(key => {
            const target = targets[key];
            target.innerHTML = '';
            const childNodes = [
                ...node.querySelectorAll(`[data-target="${key}"]`)
            ];
            childNodes.forEach(n => {
                target.appendChild(n);
                delete n.dataset.target;
            });
        });
        main.appendChild(node);
        setCurrent();
        onSend();
    };
    const redirect = (path) => {
        window.location.hash = `#${path}`;
        onRedirect();
    };
    const app = spa_router_1.App(send, redirect);
    routes.forEach(route => {
        const { method, path, handlers } = route;
        app[method](path, ...handlers);
    });
    window.addEventListener('hashchange', () => {
        const { hash } = window.location;
        const path = hash.replace('#', '');
        try {
            app.router(path);
        }
        catch (err) {
            send(error_1.error(err));
        }
    });
    if (location.hash !== '') {
        window.dispatchEvent(hashChange);
    }
    return { redirect };
};
exports.createAdmin = createAdmin;
const normalizePathEnd = (path) => path + (path.endsWith('/') ? '' : '/');
const setCurrent = () => {
    const anchors = document.querySelectorAll('a');
    const windowHash = normalizePathEnd(window.location.hash);
    anchors.forEach(anchor => {
        const anchorHash = normalizePathEnd(anchor.hash);
        anchor.classList.toggle('current', anchor.hash !== '' && windowHash.startsWith(anchorHash));
    });
};
//# sourceMappingURL=index.js.map