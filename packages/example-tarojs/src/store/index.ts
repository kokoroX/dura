import CountModel from '../models/CountModel';

import { create, ExtractState } from '@dura/plus';
import { createImmerPlugin } from '@dura/immer';
import { ExtractLoadingState, createLoadingPlugin } from '@dura/loading';
import createAction from '@dura/actions';

const initialModel = {
  count: CountModel
};

export type RootModel = typeof initialModel;

export type RootState = ExtractState<RootModel> &
  ExtractLoadingState<RootModel>;

export const store = create(
  {
    initialModel
  },
  {
    immer: createImmerPlugin(),
    loading: createLoadingPlugin(initialModel)
  }
);

const actionCreator = createAction(initialModel);

export { actionCreator };
