import mapValues from "lodash/fp/mapValues";
import compose from "lodash/fp/compose";

export function wrapObjectInDispatch<T extends Record<string, (...args: any[]) => any>>(
  dispatch: React.Dispatch<any>,
  obj: T,
) {
  return mapValues((fn) => compose(dispatch, fn), obj) as T;
}
