"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanopticonClient = void 0;
var articles_1 = require("./parsers/articles");
var clients_1 = require("./parsers/clients");
var publications_1 = require("./parsers/publications");
var fetcher_1 = require("./services/fetcher");
var PanopticonClient = /** @class */ (function () {
    function PanopticonClient(options) {
        if (options === void 0) { options = {}; }
        var provisionalApiKey = options.panopticonApiKey || process.env.PANOPTICON_API_KEY;
        if (!provisionalApiKey) {
            throw new Error("No API key provided.");
        }
        else if (!provisionalApiKey.startsWith("PANOPTICON")) {
            throw new Error("Are you sure this is a valid API key? All API keys should start with PANOPTICON_");
        }
        else {
            this.apiKey = provisionalApiKey;
        }
    }
    PanopticonClient.prototype.getArticles = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/articles", "GET", articles_1.parseArticles, this.apiKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PanopticonClient.prototype.getClients = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/client", "GET", clients_1.parseClients, this.apiKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PanopticonClient.prototype.createClient = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/client/create", "POST", clients_1.parseClient, this.apiKey, {
                            body: JSON.stringify(data),
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PanopticonClient.prototype.updateClient = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/client/update/".concat(id), "PATCH", clients_1.parseClient, this.apiKey, {
                            body: JSON.stringify(data),
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PanopticonClient.prototype.getPublications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/publication", "GET", publications_1.parsePublications, this.apiKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PanopticonClient.prototype.createPublication = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/publication/create", "POST", publications_1.parseCreatePublication, this.apiKey, {
                            body: JSON.stringify(data),
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PanopticonClient.prototype.updatePublication = function (domain, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/publication/update/".concat(domain), "PATCH", publications_1.parseUpdatePublication, this.apiKey, {
                            body: JSON.stringify(data),
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PanopticonClient;
}());
exports.PanopticonClient = PanopticonClient;
//# sourceMappingURL=index.js.map