declare const _default: {
    state: () => {
        /**
         * 姓名
         */
        name: string;
        /**
         * 性别
         */
        sex: "男" | "女";
        /**
         * 年龄
         */
        age: number;
    };
    reducers: () => {
        /**
         *
         * @param payload 同步修改姓名
         */
        onChangeName(state: {
            /**
             * 姓名
             */
            name: string;
            /**
             * 性别
             */
            sex: "男" | "女";
            /**
             * 年龄
             */
            age: number;
        }, payload: {
            newName: string;
        }): {
            /**
             * 姓名
             */
            name: string;
            /**
             * 性别
             */
            sex: "男" | "女";
            /**
             * 年龄
             */
            age: number;
        };
    };
    effects: (dispatch: any, getState: any, delay: any) => {
        /**
         * 异步修改姓名
         * @param payload
         */
        onAsyncChangeName(payload: {
            newName: string;
        }, meta: {
            loading: boolean;
        }): Promise<void>;
    };
};
export default _default;
