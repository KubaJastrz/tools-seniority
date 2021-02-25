import mapValues from "lodash/fp/mapValues";
import compose from "lodash/fp/compose";

type Fn = (...args: any[]) => any;

export function mapDispatchToActions<T extends Record<string, Fn>>(
  dispatch: React.Dispatch<any>,
  actions: T,
) {
  return mapValues((fn) => compose(dispatch, fn), actions) as T;
}
