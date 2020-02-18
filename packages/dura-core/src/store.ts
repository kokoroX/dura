import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
  ReducersMapObject
} from 'redux';
import { Config, Store } from '@dura/types';
import cloneDeep from 'lodash/cloneDeep';
import getAsyncMiddleware from './async';

/**
 * 创建store
 * @param config
 */
function create<C extends Config>(config: C): Store<C['initialModel']> {
  const {
    initialModel,
    initialState,
    middlewares = [],
    extraReducers = {},
    error = () => false
  } = cloneDeep(config);

  //聚合reducers
  const modelReducers = Object.keys(initialModel)
    .map((name: string) => {
      const currModel = initialModel[name];
      return {
        [name]: function(state = currModel.state(), action) {
          const [namespace, namereducer] = action.type.split('/');
          const reducer = currModel.reducers()[namereducer];
          if (name !== namespace || !reducer) {
            return state;
          } else {
            try {
              return reducer(state, action.payload, action.meta);
            } catch (e) {
              error(e);
              return state;
            }
          }
        }
      };
    })
    .reduce((prev, next) => ({ ...prev, ...next }), {});

  const rootReducers: ReducersMapObject<any> = {
    ...modelReducers,
    ...extraReducers
  };

  // //获取外部传入的 compose1
  const composeEnhancers = config.compose || compose;

  //store增强器
  const storeEnhancer = composeEnhancers(
    applyMiddleware(...middlewares, getAsyncMiddleware(initialModel, error))
  );

  // //获取外部传入的 createStore
  const _createStore = config.createStore || createStore;

  // //创建redux-store
  const reduxStore = initialState
    ? _createStore(combineReducers(rootReducers), initialState, storeEnhancer)
    : _createStore(combineReducers(rootReducers), storeEnhancer);

  return reduxStore;
}

export { create };
