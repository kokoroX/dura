import { create as _create } from "@dura/core";
import cloneDeep from "lodash/cloneDeep";
import values from "lodash/values";
import merge from "lodash/merge";
import entries from "lodash/entries";
import {
  Config,
  Store,
  PluginMap,
  ModelMap,
  UnionToIntersection
} from "@dura/types";
import {
  compose,
  bindActionCreators,
  applyMiddleware,
  combineReducers
} from "redux";
import {
  useSelector,
  useDispatch,
  useStore,
  shallowEqual,
  Provider,
  connect,
  batch
} from "react-redux";

function recursiveWrapModel(name, model, wrapModelList) {
  if (wrapModelList && wrapModelList.length === 0) {
    return model;
  }
  const nextModel = wrapModelList.shift()(name, model);
  return recursiveWrapModel(name, nextModel, wrapModelList);
}

function getExtraModelMap(pluginMap: PluginMap) {
  return values(pluginMap)
    .filter(plugin => plugin.extraModel)
    .map(plugin => plugin.extraModel)
    .reduce(merge, {});
}

function create<C extends Config, P extends PluginMap>(
  config: C,
  pluginMap?: P
): Store<C["initialModel"] & UnionToIntersection<P[keyof P]["extraModel"]>> {
  //clone
  const {
    initialModel,
    initialState,
    middlewares,
    extraReducers = {},
    error = () => false
  } = cloneDeep(config);

  const wrapModelList = values(pluginMap)
    .filter(p => p.wrapModel)
    .map(p => p.wrapModel);

  const extraModelMap: ModelMap = getExtraModelMap(pluginMap);

  const initialModelMap = entries(merge(initialModel, extraModelMap))
    .map(([name, model]) => {
      const newModel = recursiveWrapModel(
        name,
        model,
        cloneDeep(wrapModelList)
      );
      return {
        [name]: newModel
      };
    })
    .reduce(merge, {});

  return _create({
    initialModel: initialModelMap,
    initialState: initialState,
    middlewares: middlewares,
    compose: config.compose,
    createStore: config.createStore,
    extraReducers: extraReducers,
    error: error
  }) as Store<
    C["initialModel"] & UnionToIntersection<P[keyof P]["extraModel"]>
  >;
}

export {
  create,
  useSelector,
  useDispatch,
  useStore,
  shallowEqual,
  compose,
  bindActionCreators,
  applyMiddleware,
  combineReducers,
  Provider,
  connect,
  batch
};

export * from "@dura/types";
