import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * false khi render trên server và ở lượt hydrate đầu tiên, true sau đó.
 * Dùng để dữ liệu chỉ có ở client (cache react-query, localStorage)
 * không làm lệch HTML lúc hydrate.
 */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
}
