// import chain from 'lodash/chain';
import entries from 'lodash/entries';
import get from 'lodash/get';
import keys from 'lodash/keys';
import merge from 'lodash/merge';

/**
 * 自动loading
 */
import { EffectMap, ModelMap, Plugin } from '@dura/types';

export const createLoadingPlugin = function <MM extends ModelMap>(
  modelMap: MM
): Plugin {
  const initialState = entries(modelMap)
    .map(([name, model]) => {
      return {
        [name]: keys(get(model, "effects", () => ({}))())
          .map(ename => ({ [ename]: false }))
          .reduce(merge, {})
      };
    })
    .reduce(merge, {});

  type State = typeof initialState;

  return {
    wrapModel: (name, model) => {
      return {
        ...model,
        effects: (dispatch, getState, delay) =>
          entries(model.effects(dispatch, getState, delay))
            .map(([k, v]) => ({
              [k]: async (payload, meta) => {
                const start = () =>
                  dispatch({
                    type: "loading/startLoading",
                    payload: {
                      modelName: name,
                      effectName: k
                    }
                  }),
                  end = () =>
                    dispatch({
                      type: "loading/endLoading",
                      payload: {
                        modelName: name,
                        effectName: k
                      }
                    });

                if (meta && meta.notLoading) {
                  await v(payload, meta);
                } else {
                  try {
                    start();
                    await v(payload, meta);
                    end();
                  } catch (error) {
                    end();
                    throw error;
                  }
                }
              }
            }))
            .reduce(merge, {})
      };
    },
    extraModel: {
      loading: {
        state: () => initialState,
        reducers: () => ({
          startLoading(
            state: State,
            payload: {
              modelName: string;
              effectName: string;
            }
          ) {
            return {
              ...state,
              global: true,
              models: { [payload.modelName]: true },
              [payload.modelName]: {
                [payload.effectName]: true
              }
            };
          },
          endLoading(
            state: State,
            payload: {
              modelName: string;
              effectName: string;
            }
          ) {
            const existEffects = state.effects || {};
            const effects = {
              ...existEffects,
              [payload.modelName]: {
                ...existEffects[payload.modelName],
                [payload.effectName]: false
              }
            };
            const models = {
              ...state.models,
              [payload.modelName]: Object.keys(
                effects[payload.modelName]
              ).some(effectName => {
                return effects[effectName];
              })
            };
            const global = Object.keys(models).some(namespace => {
              return models[namespace];
            });
            return {
              global,
              models,
              effects
            };
          }
        }),
        effects: () => ({})
      }
    }
  };
};

type ConvertFnToBoolean<E extends EffectMap> = { [key in keyof E]: boolean };

export type ExtractLoadingState<RMT extends ModelMap> = {
  loading: {
    [key in keyof RMT]: ConvertFnToBoolean<ReturnType<RMT[key]["effects"]>>;
  };
};

export type LoadingMeta = {
  loading?: boolean;
};
