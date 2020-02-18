import { Config, Store } from '@dura/types';
/**
 * 创建store
 * @param config
 */
declare function create<C extends Config>(config: C): Store<C['initialModel']>;
export { create };
