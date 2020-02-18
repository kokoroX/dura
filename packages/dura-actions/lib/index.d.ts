import { ModelMap, ExtractActions } from "@dura/types";
export default function <RM extends ModelMap>(models: RM): ExtractActions<RM>;
