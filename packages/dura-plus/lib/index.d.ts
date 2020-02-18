import { Config, Store, PluginMap, UnionToIntersection } from "@dura/types";
import { compose, bindActionCreators, applyMiddleware, combineReducers } from "redux";
import { useSelector, useDispatch, useStore, shallowEqual, Provider, connect, batch } from "react-redux";
declare function create<C extends Config, P extends PluginMap>(config: C, pluginMap?: P): Store<C["initialModel"] & UnionToIntersection<P[keyof P]["extraModel"]>>;
export { create, useSelector, useDispatch, useStore, shallowEqual, compose, bindActionCreators, applyMiddleware, combineReducers, Provider, connect, batch };
export * from "@dura/types";
