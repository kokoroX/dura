import createAction from '../src/index';

const initialState = () => ({
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
});

const UserModel = {
  name: () => <const>'user',
  state: () => initialState(),
  reducers: () => ({
    /**
     *
     * @param payload 同步修改姓名
     */
    onChangeName(state, payload: { newS: string }) {
      console.log('hello');
      state.name = payload.newS;
      return state;
    }
  }),
  effects: () => ({
    async onAsyncChangeName(
      payload: { newName: string },
      meta: { loading: boolean }
    ) {}
  })
};

describe('action-describe', function() {
  it('test-action', function() {
    const actionCreator = createAction({ UserModel });
    const action = actionCreator.UserModel.onChangeName({ newS: 'test' });
    expect(action).toEqual({
      type: 'UserModel/onChangeName',
      payload: {
        newS: 'test'
      }
    });
  });
});
