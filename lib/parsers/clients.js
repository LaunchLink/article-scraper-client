"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIsNameUnique = exports.parseClient = exports.parseClients = exports.NameUniqueness = void 0;
var NameUniqueness;
(function (NameUniqueness) {
    NameUniqueness["UNIQUE_WORD"] = "UNIQUE_WORD";
    NameUniqueness["ENGLISH_WORD"] = "ENGLISH_WORD";
})(NameUniqueness = exports.NameUniqueness || (exports.NameUniqueness = {}));
var parseClients = function (data) {
    return data.map(function (d) { return (0, exports.parseClient)(d); });
};
exports.parseClients = parseClients;
var parseClient = function (data) {
    return __assign(__assign({}, data), { createdAt: new Date(data.createdAt), competitors: data.competitors.map(function (competitor) { return (__assign(__assign({}, competitor), { createdAt: new Date(competitor.createdAt) })); }) });
};
exports.parseClient = parseClient;
var parseIsNameUnique = function (data) {
    return {
        name: data.name,
        isUnique: Boolean(data.isUnique),
    };
};
exports.parseIsNameUnique = parseIsNameUnique;
//# sourceMappingURL=clients.js.map