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
var articles_1 = require("./parsers/articles");
var clients_1 = require("./parsers/clients");
var coverage_1 = require("./parsers/coverage");
var publications_1 = require("./parsers/publications");
var fetcher_1 = require("./services/fetcher");
var PanopticonClient = /** @class */ (function () {
    /**
     * Creates a new Panopticon Client. Pass the API key here, or set it as PANOPTICON_API_KEY in your environment variables.
     * @param options
     */
    function PanopticonClient(options) {
        if (options === void 0) { options = {}; }
        var provisionalApiKey = options.panopticonApiKey || process.env.PANOPTICON_API_KEY;
        if (!provisionalApiKey) {
            throw new Error("No API key provided. Please set the PANOPTICON_API_KEY in your .env file or pass one to this constructor.");
        }
        else if (!provisionalApiKey.startsWith("PANOPTICON")) {
            throw new Error("Are you sure this is a valid API key? All API keys should start with PANOPTICON_");
        }
        else {
            this.apiKey = provisionalApiKey;
        }
    }
    /**
     * Gets all articles sorted by date (newest first)
     * @param options
     * @returns A list of all articles in the system
     */
    PanopticonClient.prototype.getArticles = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryString = new URLSearchParams();
                        if (options.after) {
                            queryString.append("after", options.after.toISOString());
                        }
                        if (options.skip) {
                            queryString.append("skip", options.skip.toFixed());
                        }
                        if (options.take) {
                            queryString.append("take", options.take.toFixed());
                        }
                        return [4 /*yield*/, (0, fetcher_1.fetcher)("/articles?".concat(queryString.toString()), "GET", articles_1.parseArticles, this.apiKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets all clients, regardless of who they belong to
     * @returns All clients
     */
    PanopticonClient.prototype.getAllClients = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/client", "GET", clients_1.parseClients, this.apiKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets all clients that are clients of the user
     * @returns The user's own clients
     */
    PanopticonClient.prototype.getOwnClients = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/client/own", "GET", clients_1.parseClients, this.apiKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Checks to see if a client's name is unique. If a name is
     * not unique the client should have a description added when
     * it is created so that the app can differentiate between
     * companies of the same name when loading coverage.
     * @returns The name and a boolean of whether it's unique
     */
    PanopticonClient.prototype.isClientNameUnique = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/client/is-name-unique", "POST", clients_1.parseIsNameUnique, this.apiKey, {
                            name: name,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Creates a new client and adds it to the user's list of
     * clients. Attach a list of competitors, which can either
     * be a string or the ID of a client.
     * You should search clients before creating new competitors,
     * so that there aren't any duplicates.
     * @param client The data of the client to add
     * @returns A client and its competitors
     */
    PanopticonClient.prototype.createClient = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var resultClient, competitorResults;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/client/create", "POST", clients_1.parseClient, this.apiKey, client)];
                    case 1:
                        resultClient = _a.sent();
                        return [4 /*yield*/, Promise.all(client.competitors
                                .filter(function (competitor) { return typeof competitor !== "string"; })
                                .map(function (competitor) {
                                return (0, fetcher_1.fetcher)("/competitor/create", "POST", clients_1.parseClient, _this.apiKey, {
                                    body: JSON.stringify(competitor),
                                });
                            }))];
                    case 2:
                        competitorResults = _a.sent();
                        return [4 /*yield*/, this.updateClient(resultClient.id, {
                                competitors: competitorResults
                                    .map(function (c) { return c.id; })
                                    .concat(client.competitors.filter(function (competitor) { return typeof competitor === "string"; })),
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Updates a client based on its ID.
     * @param id The ID of the client to update
     * @param data The data of the client to update
     * @returns The client with its competitors
     */
    PanopticonClient.prototype.updateClient = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/client/update/".concat(id), "PATCH", clients_1.parseClient, this.apiKey, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets every publication in the system.
     * @returns A list of all publications
     */
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
    /**
     * Gets all coverage, separated by the client that it belongs to.
     * @returns All coverage in the system
     */
    PanopticonClient.prototype.getAllCoverage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/coverage", "GET", coverage_1.parseCoverage, this.apiKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets coverage specifically for one client, along with the coverage for all its competitors.
     * @param clientId The ID of the client to get
     * @returns An object with the client's information and coverage for it and its competitors
     */
    PanopticonClient.prototype.getCoverageForClient = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/coverage/client/".concat(clientId), "GET", coverage_1.parseClientCoverage, this.apiKey)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Creates a new publication. All feeds that it is passed should be valid and parseable.
     * @param data The name, domain and feeds of the publication
     * @returns A publication if successful or an error if not
     */
    PanopticonClient.prototype.createPublication = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/publication/create", "POST", publications_1.parseCreatePublication, this.apiKey, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Updates a publication by its domain.
     * @param domain The domain of the publication to update
     * @param data A list of data to set on the publication
     * @returns The updated publication
     */
    PanopticonClient.prototype.updatePublication = function (domain, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetcher_1.fetcher)("/publication/update/".concat(domain), "PATCH", publications_1.parseUpdatePublication, this.apiKey, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PanopticonClient;
}());
exports.default = PanopticonClient;
//# sourceMappingURL=index.js.map