import { actionCreator } from '../src/store';
import { OnChangeNameAction, OnAsyncChangeName } from './UserMode';
import { EffectApi } from '@dura/plus';

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
  age: undefined as number
};

type State = typeof initialState;

export default {
  state: () => initialState,
  reducers: () => ({
    /**
     *
     * @param payload 同步修改姓名
     */
    onChangeName(
      state: State,
      payload: {
        newName: string;
      }
    ): State {
      state.name = payload.newName + '9';
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
      console.log(1);

      console.log(2);

      delay(1000).then(() => console.log(3));

      await delay(3000);

      console.log(4);

      dispatch(
        actionCreator.user.onChangeName({
          newName: payload.newName
        })
      );
    }
  })
};

async function hello() {}

const a = hello;
