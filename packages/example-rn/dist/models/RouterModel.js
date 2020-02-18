import * as tslib_1 from "tslib";
const initialState = {};
export default {
    state: () => initialState,
    reducers: () => ({}),
    effects: () => ({
        pushUserPage(payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                payload.navigation.push('User');
            });
        }
    })
};
