import UserModel from './models/UserModel';
import RouterModel from './models/RouterModel';

import { create, ExtractState } from '@dura/plus';
import { createImmerPlugin } from '@dura/immer';
import { ExtractLoadingState, createLoadingPlugin } from '@dura/loading';
import createAction from '@dura/actions';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';

const initialModel = {
  /**
   * 用户模块1
   */
  user: UserModel,
  router: RouterModel
};

export type RootModel = typeof initialModel;

export type RootState = ExtractState<RootModel> &
  ExtractLoadingState<RootModel>;

let error = [];

export const store = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
  ? create(
      {
        initialModel: initialModel,
        compose: window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
        middlewares: [
          store => next => action => {
            error.push(action);
            next(action);
          }
        ],
        error: e => {
          console.log(JSON.stringify(error));
        }
      },
      {
        immer: createImmerPlugin(),
        loading: createLoadingPlugin(initialModel)
      }
    )
  : create(
      {
        initialModel: initialModel,
        middlewares: [
          store => next => action => {
            error.push(action);
            next(action);
          }
        ],
        error: e => {
          console.log(JSON.stringify(error));
        }
      },
      {
        immer: createImmerPlugin(),
        loading: createLoadingPlugin(initialModel)
      }
    );

export const actionCreator = createAction(initialModel);

export const connectHOC = function(mapState, mapDispatch) {
  return connect(
    mapState,
    mapDispatch,
    null,
    {
      areStatesEqual: isEqual,
      areOwnPropsEqual: isEqual,
      areStatePropsEqual: isEqual,
      areMergedPropsEqual: isEqual
    }
  );
};
