import { ModelMap, Model } from "@dura/types";
import { delay } from "./util";
import produce from "immer";

export default function getAsyncMiddleware(rootModel: ModelMap, error) {
  return store => next => action => {
    let result = next(action);

    const [namespace, nameeffect] = action.type.split("/");

    if (rootModel[namespace]) {
      rootModel?.[namespace]
        ?.effects(
          store.dispatch,
          () => store.getState(),
          delay
        )
        ?.[nameeffect]?.(action?.payload, action?.meta)
        ?.catch(error);
    }

    return result;
  };
}
