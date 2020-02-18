"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function getAsyncMiddleware(rootModel, error) {
    return function (store) { return function (next) { return function (action) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var result = next(action);
        var _j = action.type.split("/"), namespace = _j[0], nameeffect = _j[1];
        if (rootModel[namespace]) {
            (_h = (_e = (_c = (_b = (_a = rootModel) === null || _a === void 0 ? void 0 : _a[namespace]) === null || _b === void 0 ? void 0 : _b.effects(store.dispatch, function () { return store.getState(); }, util_1.delay)) === null || _c === void 0 ? void 0 : (_d = _c)[nameeffect]) === null || _e === void 0 ? void 0 : _e.call(_d, (_f = action) === null || _f === void 0 ? void 0 : _f.payload, (_g = action) === null || _g === void 0 ? void 0 : _g.meta)) === null || _h === void 0 ? void 0 : _h.catch(error);
        }
        return result;
    }; }; };
}
exports.default = getAsyncMiddleware;
//# sourceMappingURL=async.js.map