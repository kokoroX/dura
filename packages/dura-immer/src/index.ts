import { Plugin } from '@dura/types';
import produce from 'immer';
import entries from 'lodash/entries';
import merge from 'lodash/merge';

export const createImmerPlugin = function(): Plugin {
  return {
    wrapModel: (name, model) => {
      return {
        ...model,
        reducers: () =>
          entries(model.reducers())
            .map(([k, v]) => ({
              [k]: (baseState, payload, meta) => {
                return produce(baseState, draftState => {
                  return v(draftState, payload, meta);
                });
              }
            }))
            .reduce(merge, {})
      };
    }
  };
};
