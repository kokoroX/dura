import { actionCreator } from '../store/index';

const initialState = {
  count: 0 as number
};

type State = typeof initialState;

export default {
  state: () => initialState,
  reducers: () => ({
    onChangeCount(state: State, payload: { count: number }) {
      return { ...state, count: state.count + payload.count };
    }
  }),
  effects: (dispatch, getState, delay) => ({
    async onAsyncChangeCount(
      payload: { count: number },
      meta?: { loading: boolean }
    ) {
      await delay(2000);
      dispatch(actionCreator.count.onChangeCount(payload));
    }
  })
};
