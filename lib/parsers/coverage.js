"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseClientCoverage = exports.parseCoverage = void 0;
var parseCoverage = function (data) {
    return data.map(function (d) { return ({
        name: d.name,
        id: d.id,
        coverage: d.coverage.map(function (c) { return ({
            url: c.url,
            sentence: c.sentence,
            createdAt: new Date(c.createdAt),
        }); }),
    }); });
};
exports.parseCoverage = parseCoverage;
var parseClientCoverage = function (data) {
    return {
        id: data.id,
        name: data.name,
        coverage: data.coverage.map(function (c) { return ({
            url: c.url,
            sentence: c.sentence,
            createdAt: new Date(c.createdAt),
        }); }),
        competitorCoverage: data.competitorCoverage.map(function (d) { return ({
            name: d.name,
            id: d.id,
            coverage: d.coverage.map(function (c) { return ({
                url: c.url,
                sentence: c.sentence,
                createdAt: new Date(c.createdAt),
            }); }),
        }); }),
    };
};
exports.parseClientCoverage = parseClientCoverage;
//# sourceMappingURL=coverage.js.map