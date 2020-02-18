import { create } from "@dura/plus";
import { createLoadingPlugin } from "../src/index";
import createAction from "@dura/actions";

describe("测试loading 插件", function() {
  it("测试异常场景下，loading关闭的问题", async function() {
    const user = {
      state: () => ({
        /**
         * 姓名
         */
        name: undefined,
        sex: undefined
      }),
      reducers: () => ({}),
      effects: () => ({
        /**
         * 异步获取用户信息
         * @param param0
         */
        async onAsyncChangeName(
          payload: { name: string },
          meta: { loading: boolean }
        ) {
          throw new Error("error");
        }
      })
    };
    const initialModel = {
      /**
       * 用户模块
       */
      user
    };

    const store = create(
      {
        initialModel
      },
      {
        loading: createLoadingPlugin(initialModel)
      }
    );

    const { getState, dispatch } = store;

    const actionCreator = createAction(initialModel);

    expect(getState().user).toEqual({ name: undefined, sex: undefined });

    try {
      await dispatch(
        actionCreator.user.onAsyncChangeName(
          { name: "张三" },
          { loading: true }
        )
      );
    } catch (error) {
      expect(store.getState().loading.user.onAsyncChangeName).toEqual(false);
    }
  });
});
