import { ModelMap, Model, ExtractActions } from "@dura/types";
import keys from "lodash/keys";
import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";

export default function<RM extends ModelMap>(models: RM): ExtractActions<RM> {
  return keys(models)
    .map((name: string) => extractAction(name, models[name]))
    .reduce(merge, {});
}

function extractAction(name: string, model: Model<any>) {
  const { reducers, effects } = cloneDeep(model);
  return {
    [name]: keys(merge(reducers(), effects()))
      .map((reducerKey: string) => ({
        [reducerKey]: (payload, meta) => ({
          type: `${name}/${reducerKey}`,
          payload,
          meta
        })
      }))
      .reduce(merge, {})
  };
}
