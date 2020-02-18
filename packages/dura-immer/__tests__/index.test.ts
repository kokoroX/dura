import { create } from '@dura/plus';
import { createImmerPlugin } from '../src/index';
import createActions from '@dura/actions';

describe('测试immer插件', function() {
  it('测试immer插件', function() {
    const initialState = {
      name: undefined,
      sex: undefined,
      addressList: [
        {
          province: undefined
        },
        {
          province: '安徽'
        }
      ]
    };
    const user = {
      state: () => initialState,
      reducers: () => ({
        onChangeName(
          state: typeof initialState,
          payload: { provinceName: string }
        ) {
          state.addressList[0].province = payload.provinceName;
        }
      }),
      effects: () => ({})
    };
    const initialModel = {
      user
    };
    const store = create(
      {
        initialModel
      },
      {
        immer: createImmerPlugin()
      }
    );

    const { getState, dispatch } = store;

    const actionCreator = createActions(initialModel);

    expect(getState().user.addressList[0].province).toBeUndefined();

    dispatch(actionCreator.user.onChangeName({ provinceName: '江苏' }));

    expect(getState().user.addressList[0].province).toEqual('江苏');
  });
});
