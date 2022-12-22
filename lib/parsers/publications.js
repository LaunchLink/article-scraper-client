"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUpdatePublication = exports.parseCreatePublication = exports.parsePublications = exports.isCreatePublicationError = void 0;
function isCreatePublicationError(publication) {
    return "message" in publication;
}
exports.isCreatePublicationError = isCreatePublicationError;
var parsePublications = function (data) {
    return data.map(function (d) { return ({
        domain: d.domain,
        name: d.name,
        feeds: d.feeds.map(function (f) { return ({
            url: f.url,
            publicationId: f.publicationId,
        }); }),
    }); });
};
exports.parsePublications = parsePublications;
var parseCreatePublication = function (data) {
    return data;
};
exports.parseCreatePublication = parseCreatePublication;
var parseUpdatePublication = function (data) {
    return data;
};
exports.parseUpdatePublication = parseUpdatePublication;
//# sourceMappingURL=publications.js.map