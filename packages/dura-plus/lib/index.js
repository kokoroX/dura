"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@dura/core");
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var values_1 = __importDefault(require("lodash/values"));
var merge_1 = __importDefault(require("lodash/merge"));
var entries_1 = __importDefault(require("lodash/entries"));
var redux_1 = require("redux");
exports.compose = redux_1.compose;
exports.bindActionCreators = redux_1.bindActionCreators;
exports.applyMiddleware = redux_1.applyMiddleware;
exports.combineReducers = redux_1.combineReducers;
var react_redux_1 = require("react-redux");
exports.useSelector = react_redux_1.useSelector;
exports.useDispatch = react_redux_1.useDispatch;
exports.useStore = react_redux_1.useStore;
exports.shallowEqual = react_redux_1.shallowEqual;
exports.Provider = react_redux_1.Provider;
exports.connect = react_redux_1.connect;
exports.batch = react_redux_1.batch;
function recursiveWrapModel(name, model, wrapModelList) {
    if (wrapModelList && wrapModelList.length === 0) {
        return model;
    }
    var nextModel = wrapModelList.shift()(name, model);
    return recursiveWrapModel(name, nextModel, wrapModelList);
}
function getExtraModelMap(pluginMap) {
    return values_1.default(pluginMap)
        .filter(function (plugin) { return plugin.extraModel; })
        .map(function (plugin) { return plugin.extraModel; })
        .reduce(merge_1.default, {});
}
function create(config, pluginMap) {
    //clone
    var _a = cloneDeep_1.default(config), initialModel = _a.initialModel, initialState = _a.initialState, middlewares = _a.middlewares, _b = _a.extraReducers, extraReducers = _b === void 0 ? {} : _b, _c = _a.error, error = _c === void 0 ? function () { return false; } : _c;
    var wrapModelList = values_1.default(pluginMap)
        .filter(function (p) { return p.wrapModel; })
        .map(function (p) { return p.wrapModel; });
    var extraModelMap = getExtraModelMap(pluginMap);
    var initialModelMap = entries_1.default(merge_1.default(initialModel, extraModelMap))
        .map(function (_a) {
        var _b;
        var name = _a[0], model = _a[1];
        var newModel = recursiveWrapModel(name, model, cloneDeep_1.default(wrapModelList));
        return _b = {},
            _b[name] = newModel,
            _b;
    })
        .reduce(merge_1.default, {});
    return core_1.create({
        initialModel: initialModelMap,
        initialState: initialState,
        middlewares: middlewares,
        compose: config.compose,
        createStore: config.createStore,
        extraReducers: extraReducers,
        error: error
    });
}
exports.create = create;
//# sourceMappingURL=index.js.map