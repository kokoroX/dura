import { create } from "../src/index";

describe("测试effect", function() {
  it("测试effect", function(done) {
    const UserModel = {
      state: () => ({
        name: undefined
      }),
      reducers: () => ({
        onChangeName(state, payload: { newName: string }) {
          return { ...state, name: payload.newName };
        }
      }),
      effects: (dispatch, getState, delay) => ({
        /**
         * 异步修改用户姓名
         * @param effectApi
         * @param action
         */
        async onAsyncChangeName(payload: { nextName: string }) {
          await delay(500);
          const name = getState().user.name;
          if (!name) {
            dispatch({
              type: "user/onChangeName",
              payload: {
                newName: payload.nextName
              }
            });
          }
        }
      })
    };

    const rootModels = {
      user: UserModel
    };

    const store = create({
      initialModel: rootModels
    });

    const { dispatch, getState } = store;

    expect(getState().user.name).toBeUndefined();

    dispatch({
      type: "user/onAsyncChangeName",
      payload: {
        nextName: "张三"
      }
    });

    setTimeout(() => {
      // expect(getState().user.name).toEqual("张三");
      done();
    }, 2000);
  });
});
