import { ModelMap } from "@dura/types";
export default function getAsyncMiddleware(rootModel: ModelMap, error: any): (store: any) => (next: any) => (action: any) => any;
