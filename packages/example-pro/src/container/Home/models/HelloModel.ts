import { actionCreator, RootState } from '@store';
import { message } from 'antd';

const initialState = () => {
  return {
    name: '张三',
    userList: [],
    articleList: [
      {
        id: 1,
        title: '文章标题',
        context: '马云退休了'
      },
      {
        id: 2,
        title: '苹果发布会',
        context: '浴霸来了'
      }
    ]
  };
};

type State = ReturnType<typeof initialState>;

const reducers = () => {
  return {
    onChangeName(state: State, payload: { nextName: string }) {
      state.name = payload.nextName;
    },
    /**
     * 更改item选项
     * @param state
     * @param payload
     */
    onChangeItem(state: State, payload: { id: number; title: string }) {
      const item = state.articleList.find(n => n.id === payload.id);
      item.title = payload.title;
      // state.articleList.push({id:12,title:'测试',context:'测试'})
    },
    onChangeUserList(state: State, payload: { userList: any[] }) {
      state.userList = payload.userList;
    }
  };
};

const effects = (dispatch, getState, delay) => {
  return {
    async onAsyncQueryUserList(payload, meta: { success: () => void }) {
      const res = await delay(1000);
      const rootState: RootState = getState();
      rootState.user.name;
      dispatch(
        actionCreator.hello.onChangeUserList({ userList: [{ name: '' }] })
      );
      dispatch(
        actionCreator.hello.onChangeUserList({ userList: res.userList })
      );
    }
  };
};

export default {
  state: initialState,
  reducers: reducers,
  effects: effects
};
