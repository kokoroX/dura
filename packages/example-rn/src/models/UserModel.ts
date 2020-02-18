import { EffectApi } from '@dura/plus';
import { actionCreator } from '../store';

const initialState = {
  /**
   * 姓名
   */
  name: '默认姓名' as string,
  /**
   * 性别
   */
  sex: undefined as '男' | '女',
  /**
   * 年龄
   */
  age: undefined as number,
  /**
   * 文本内容
   */
  context: '',
  isShow: false,
  isShowDraw: false
};

type State = typeof initialState;

export default {
  state: () => initialState,
  reducers: () => ({
    onChangeIsShowDraw(state: State, payload: { isShowDraw: boolean }) {
      state.isShowDraw = payload.isShowDraw;
    },
    onChangeIsShow(state: State, payload: { nextIsShow: boolean }) {
      state.isShow = payload.nextIsShow;
    },
    /**
     *
     * @param payload 同步修改姓名
     */
    onChangeName(state: State, payload: { newName: string }): State {
      state.name = payload.newName;
      return state;
    },
    onChangeContext(state: State, payload: { newContext: string }) {
      state.context = payload.newContext;
      if (payload.newContext.indexOf('3') !== -1) {
        throw new Error();
      }
      return state;
    }
  }),
  effects: (dispatch, getState, delay) => ({
    /**
     * 异步修改姓名
     * @param payload
     */
    async onAsyncChangeName(
      payload: { newName: string },
      meta: { loading: boolean }
    ) {
      console.log('hello');

      await delay(2000);
      // if (payload.newName.indexOf('3') !== -1) {
      //   throw new Error();
      // }

      dispatch(actionCreator.user.onChangeName(payload));

      dispatch(actionCreator.user.onChangeIsShow({ nextIsShow: true }));
    }
  })
};
