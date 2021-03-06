import UserModel from "./models/UserModel";
import RouterModel from "./models/RouterModel"

import { create, ExtractState } from "@dura/plus";
import { createImmerPlugin } from "@dura/immer";
import { ExtractLoadingState, createLoadingPlugin } from "@dura/loading";

const initialModel = {
  /**
   * 用户模块1
   */
  user: UserModel,
  router:RouterModel
};

export type RootModel = typeof initialModel;

export type RootState = ExtractState<RootModel> & ExtractLoadingState<RootModel>;

export const store = create(
  {
    initialModel:initialModel,
    compose: window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
  },
  {
    immer: createImmerPlugin(),
    loading: createLoadingPlugin(initialModel)
  }
);

export const { actionCreator } = store;
