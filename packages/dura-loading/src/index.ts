import entries from 'lodash/entries';
import keys from 'lodash/keys';
import merge from 'lodash/merge';

/**
 * 自动loading
 */
import { EffectApi, EffectMap, ExcludeTypeAction, ModelMap, Plugin } from '@dura/types';

export const createLoadingPlugin = function<MM extends ModelMap>(
  modelMap: MM
): Plugin {
  const initialState = entries(modelMap)
    .map(([modelName, model]) => ({
      [modelName]: keys(model.effects)
        .map((effectName: string) => ({ [effectName]: false }))
        .reduce(merge, {})
    }))
    .reduce(merge, {});
  type State = typeof initialState;
  type StartLoadingAction = {
    payload: {
      modelName: string;
      effectName: string;
    };
  };
  type EndLoadingAction = {
    payload: {
      modelName: string;
      effectName: string;
    };
  };
  return {
    onEffect: (modelName, effectName, effect) => {
      return async (effectApi: EffectApi, action: ExcludeTypeAction) => {
        const start = () =>
            effectApi.dispatch({
              type: "loading/startLoading",
              payload: {
                modelName,
                effectName
              }
            }),
          end = () =>
            effectApi.dispatch({
              type: "loading/endLoading",
              payload: {
                modelName,
                effectName
              }
            });

        if (action.meta && action.meta.notLoading) {
          await effect(effectApi, action);
        } else {
          try {
            start();
            await effect(effectApi, action);
            end();
          } catch (error) {
            end();
            throw error;
          }
        }
      };
    },
    extraModel: {
      loading: {
        state: initialState,
        reducers: {
          startLoading(state: State, action: StartLoadingAction) {
            return {
              ...state,
              global: true,
              models: { [action.payload.modelName]: true },
              [action.payload.modelName]: {
                [action.payload.effectName]: true
              }
            };
          },
          endLoading(state: State, action: EndLoadingAction) {
            const existEffects = state.effects || {};
            const effects = {
              ...existEffects,
              [action.payload.modelName]: {
                ...existEffects[action.payload.modelName],
                [action.payload.effectName]: false
              }
            };
            const models = {
              ...state.models,
              [action.payload.modelName]: Object.keys(
                effects[action.payload.modelName]
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
        },
        effects: {}
      }
    }
  };
};

type ConvertFnToBoolean<E extends EffectMap> = { [key in keyof E]: boolean };

export type ExtractLoadingState<RMT extends ModelMap> = {
  loading: { [key in keyof RMT]: ConvertFnToBoolean<RMT[key]["effects"]> };
};

export type LoadingMeta = {
  loading?: boolean;
};
