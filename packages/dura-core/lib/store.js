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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var async_1 = __importDefault(require("./async"));
/**
 * 创建store
 * @param config
 */
function create(config) {
    var _a = cloneDeep_1.default(config), initialModel = _a.initialModel, initialState = _a.initialState, _b = _a.middlewares, middlewares = _b === void 0 ? [] : _b, _c = _a.extraReducers, extraReducers = _c === void 0 ? {} : _c, _d = _a.error, error = _d === void 0 ? function () { return false; } : _d;
    //聚合reducers
    var modelReducers = Object.keys(initialModel)
        .map(function (name) {
        var _a;
        var currModel = initialModel[name];
        return _a = {},
            _a[name] = function (state, action) {
                if (state === void 0) { state = currModel.state(); }
                var _a = action.type.split('/'), namespace = _a[0], namereducer = _a[1];
                var reducer = currModel.reducers()[namereducer];
                if (name !== namespace || !reducer) {
                    return state;
                }
                else {
                    try {
                        return reducer(state, action.payload, action.meta);
                    }
                    catch (e) {
                        error(e);
                        return state;
                    }
                }
            },
            _a;
    })
        .reduce(function (prev, next) { return (__assign(__assign({}, prev), next)); }, {});
    var rootReducers = __assign(__assign({}, modelReducers), extraReducers);
    // //获取外部传入的 compose1
    var composeEnhancers = config.compose || redux_1.compose;
    //store增强器
    var storeEnhancer = composeEnhancers(redux_1.applyMiddleware.apply(void 0, __spreadArrays(middlewares, [async_1.default(initialModel, error)])));
    // //获取外部传入的 createStore
    var _createStore = config.createStore || redux_1.createStore;
    // //创建redux-store
    var reduxStore = initialState
        ? _createStore(redux_1.combineReducers(rootReducers), initialState, storeEnhancer)
        : _createStore(redux_1.combineReducers(rootReducers), storeEnhancer);
    return reduxStore;
}
exports.create = create;
//# sourceMappingURL=store.js.map