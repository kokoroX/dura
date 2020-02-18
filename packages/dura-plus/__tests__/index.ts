import { create } from "../src/index";
import createActions from "@dura/actions";

describe("测试plus", function() {
  it("测试插件额外的model", function() {
    const UserModel = {
      state: () => ({
        name: undefined
      }),
      reducers: () => ({
        onChangeLoad(state, action) {
          return state;
        }
      }),
      effects: (dispatch, getState, delay) => ({
        async onAsyncChangeName(effectApi, action) {}
      })
    };

    const plugins = {
      loading: {
        extraModel: {
          loading: {
            state: () => ({
              name: "测试loading"
            }),
            reducers: () => ({
              loadingChange(state, action) {
                return state;
              }
            }),
            effects: () => ({})
          }
        }
      },
      immer: {
        extraModel: {
          immer: {
            state: () => ({
              name: "测试immer"
            }),
            reducers: () => ({
              immerChange(state, action) {
                return state;
              }
            }),
            effects: () => ({})
          }
        }
      }
    };
    const store = create(
      {
        initialModel: {
          user: UserModel
        }
      },
      plugins
    );

    expect(store.getState().loading.name).toEqual("测试loading");
  });
  it("测试插件", function() {
    const UserModel = {
      state: () => ({
        name: undefined
      }),
      reducers: () => ({
        onChangeLoad(state, action) {
          return state;
        }
      }),
      effects: () => ({
        async onAsyncChangeName() {}
      })
    };

    const StudentModel = {
      state: () => ({
        name: undefined
      }),
      reducers: () => ({
        onChangeLoad(state, action) {
          return state;
        }
      }),
      effects: () => ({
        async onAsyncChangeStudentName() {
          console.log("StudentModel-effects");
        }
      })
    };

    const store = create(
      {
        initialModel: {
          user: UserModel,
          student: StudentModel
        }
      },
      {
        a: {
          onReducer: (modelName, reducerName, reducer) => {
            return (state, action) => {
              console.log("开始");
              const result = reducer(state, action.payload, action.meta);
              console.log("结束");
              return result;
            };
          },
          onEffect: (modelName, effectName, effect) => {
            return async (effectApi, action) => {
              console.log("effect开始1");

              await effect(effectApi, action);

              console.log("effect结束1");
            };
          }
        },
        b: {
          onReducer: (modelName, reducerName, reducer) => {
            return (state, action) => {
              console.log("开始1");
              const result = reducer(state, action.payload, action.meta);
              console.log("结束1");
              return result;
            };
          },
          onEffect: (modelName, effectName, effect) => {
            return async (effectApi, action) => {
              console.log("effect开始2");

              await effect(effectApi, action);

              console.log("effect结束2");
            };
          }
        }
      }
    );
    const actionCreator = createActions({
      user: UserModel,
      student: StudentModel
    });

    store.dispatch(actionCreator.student.onAsyncChangeStudentName());
  });

  it("不传任何插件", function() {
    const UserModel = {
      state: () => ({
        name: undefined
      }),
      reducers: () => ({
        onChangeLoad(state, action) {
          return state;
        }
      }),
      effects: () => ({
        async onAsyncChangeName(effectApi, action) {}
      })
    };

    const store = create({
      initialModel: {
        user: UserModel
      }
    });

    expect(store.getState().user.name).toBeUndefined();
  });
});
