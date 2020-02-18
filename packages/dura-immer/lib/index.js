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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immer_1 = __importDefault(require("immer"));
var entries_1 = __importDefault(require("lodash/entries"));
var merge_1 = __importDefault(require("lodash/merge"));
exports.createImmerPlugin = function () {
    return {
        wrapModel: function (name, model) {
            return __assign(__assign({}, model), { reducers: function () {
                    return entries_1.default(model.reducers())
                        .map(function (_a) {
                        var _b;
                        var k = _a[0], v = _a[1];
                        return (_b = {},
                            _b[k] = function (baseState, payload, meta) {
                                return immer_1.default(baseState, function (draftState) {
                                    return v(draftState, payload, meta);
                                });
                            },
                            _b);
                    })
                        .reduce(merge_1.default, {});
                } });
        }
    };
};
//# sourceMappingURL=index.js.map