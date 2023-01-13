"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArticles = void 0;
var parseArticles = function (data) {
    return data.map(function (d) {
        return {
            url: d.url,
            title: d.title,
            author: d.author,
            synthExtract: d.synthExtract,
            tags: d.tags,
            publication: d.publication,
            createdAt: new Date(d.createdAt),
        };
    });
};
exports.parseArticles = parseArticles;
//# sourceMappingURL=articles.js.map