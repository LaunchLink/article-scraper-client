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
            clientMentions: d.clientMentions.map(function (clientMention) { return ({
                sentence: clientMention.sentence,
                client: {
                    name: clientMention.clientEntity.name,
                    id: clientMention.clientEntity.id,
                },
            }); }),
            createdAt: new Date(d.createdAt),
        };
    });
};
exports.parseArticles = parseArticles;
//# sourceMappingURL=articles.js.map