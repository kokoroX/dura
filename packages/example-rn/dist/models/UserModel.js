import * as tslib_1 from "tslib";
import { actionCreator } from '../store';
const initialState = {
    /**
     * 姓名
     */
    name: '默认姓名',
    /**
     * 性别
     */
    sex: undefined,
    /**
     * 年龄
     */
    age: undefined,
    /**
     * 文本内容
     */
    context: '',
    isShow: false,
    isShowDraw: false
};
export default {
    state: () => initialState,
    reducers: () => ({
        onChangeIsShowDraw(state, payload) {
            state.isShowDraw = payload.isShowDraw;
        },
        onChangeIsShow(state, payload) {
            state.isShow = payload.nextIsShow;
        },
        /**
         *
         * @param payload 同步修改姓名
         */
        onChangeName(state, payload) {
            state.name = payload.newName;
            return state;
        },
        onChangeContext(state, payload) {
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
        onAsyncChangeName(payload, meta) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log('hello');
                yield delay(2000);
                // if (payload.newName.indexOf('3') !== -1) {
                //   throw new Error();
                // }
                dispatch(actionCreator.user.onChangeName(payload));
                dispatch(actionCreator.user.onChangeIsShow({ nextIsShow: true }));
            });
        }
    })
};
