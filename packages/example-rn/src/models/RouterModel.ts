const initialState = {};

type State = typeof initialState;

export default {
  state: () => initialState,
  reducers: () => ({}),
  effects: () => ({
    async pushUserPage(payload: { navigation: any }) {
      payload.navigation.push('User');
    }
  })
};
