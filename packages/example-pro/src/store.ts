import UserModel from '@models/UserModel';

import { create, ExtractState } from '@dura/plus';
import { createImmerPlugin } from '@dura/immer';
import { createLoadingPlugin, ExtractLoadingState } from '@dura/loading';
import createActions from '@dura/actions';
import HelloModel from './container/Home/models/HelloModel';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

const initialModel = {
  /**
   * 用户模块
   */
  user: UserModel,
  /**
   * hello 模块， 主要处理一些乱七八糟的问题
   */
  hello: HelloModel
};

export type RootModel = typeof initialModel;

export type RootState = ExtractState<RootModel> &
  ExtractLoadingState<RootModel>;

export const store = create(
  {
    initialModel: initialModel,
    compose: window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
  },
  {
    immer: createImmerPlugin(),
    loading: createLoadingPlugin(initialModel)
  }
);

export const actionCreator = createActions(initialModel);

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
