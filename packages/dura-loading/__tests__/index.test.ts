import { create, EffectApi } from '@dura/plus';
import { createLoadingPlugin } from '../src/index';
import createAction from '@dura/actions';

describe('测试loading 插件', function() {
  it('测试loading 插件,启用loading', function(done) {
    const user = {
      state: () => ({
        /**
         * 姓名
         */
        name: undefined,
        sex: undefined
      }),
      reducers: () => ({
        onChangeName(state, payload: { name: string }) {
          return { ...state, ...payload };
        }
      }),
      effects: (dispatch, getState, delay) => ({
        /**
         * 异步获取用户信息
         * @param param0
         */
        async onAsyncChangeName(
          payload: { name: string },
          meta: { loading: boolean }
        ) {
          await delay(1000);
          dispatch(actionCreator.user.onChangeName(payload));
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

    expect(getState().user).toEqual({ name: undefined, sex: undefined });

    const actionCreator = createAction(initialModel);

    dispatch(
      actionCreator.user.onAsyncChangeName({ name: '张三' }, { loading: true })
    );

    setTimeout(
      () => expect(getState().loading.user.onAsyncChangeName).toEqual(true),
      300
    );

    setTimeout(() => {
      expect(getState().user.name).toEqual('张三');
      expect(getState().loading.user.onAsyncChangeName).toEqual(false);
      done();
    }, 1500);
  });

  it('测试loading 插件,不启用loading', function(done) {
    const user = {
      state: () => ({
        /**
         * 姓名
         */
        name: undefined,
        sex: undefined
      }),
      reducers: () => ({
        onChangeName(state, payload: { name: string }) {
          return { ...state, ...payload };
        }
      }),
      effects: (dispatch, getState, delay) => ({
        /**
         * 异步获取用户信息
         * @param param0
         */
        async onAsyncChangeName(
          payload: { name: string },
          meta: { loading: boolean }
        ) {
          await delay(1000);
          dispatch(actionCreator.user.onChangeName(payload));
        }
      })
    };
    const initialModel = {
      /**
       * 用户模块
       */
      user,
      t: {
        state: () => ({}),
        reducers: () => ({}),
        effects: () => ({})
      }
    };

    const store = create(
      {
        initialModel
      },
      {
        loading: createLoadingPlugin(initialModel)
      }
    );

    const { dispatch, getState } = store;

    const actionCreator = createAction(initialModel);

    expect(getState().user).toEqual({ name: undefined, sex: undefined });

    dispatch(
      actionCreator.user.onAsyncChangeName({ name: '张三' }, { loading: false })
    );

    setTimeout(
      () => expect(getState().loading.user.onAsyncChangeName).toEqual(false),
      300
    );

    setTimeout(() => {
      expect(getState().user.name).toEqual('张三');
      expect(getState().loading.user.onAsyncChangeName).toEqual(false);
      done();
    }, 1500);
  });
});
