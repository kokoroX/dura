"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var keys_1 = __importDefault(require("lodash/keys"));
var merge_1 = __importDefault(require("lodash/merge"));
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
function default_1(models) {
    return keys_1.default(models)
        .map(function (name) { return extractAction(name, models[name]); })
        .reduce(merge_1.default, {});
}
exports.default = default_1;
function extractAction(name, model) {
    var _a;
    var _b = cloneDeep_1.default(model), reducers = _b.reducers, effects = _b.effects;
    return _a = {},
        _a[name] = keys_1.default(merge_1.default(reducers(), effects()))
            .map(function (reducerKey) {
            var _a;
            return (_a = {},
                _a[reducerKey] = function (payload, meta) { return ({
                    type: name + "/" + reducerKey,
                    payload: payload,
                    meta: meta
                }); },
                _a);
        })
            .reduce(merge_1.default, {}),
        _a;
}
//# sourceMappingURL=index.js.map