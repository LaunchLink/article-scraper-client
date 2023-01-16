"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSuggestedComment = exports.parseArticles = void 0;
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
var parseSuggestedComment = function (data) {
    return data;
};
exports.parseSuggestedComment = parseSuggestedComment;
//# sourceMappingURL=articles.js.map