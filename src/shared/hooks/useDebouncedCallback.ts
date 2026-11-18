'use client';

import { useCallback, useEffect, useRef } from 'react';

// 마지막 호출 후 delay(ms) 동안 다시 호출되지 않을 때만 callback을 실행한다.
// cancel로 대기 중인 실행을 취소할 수 있다(예: Enter로 즉시 검색할 때).
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  // 항상 최신 callback을 호출하도록 렌더 후에 갱신한다.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const debounced = useCallback(
    (...args: Args) => {
      cancel();
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        callbackRef.current(...args);
      }, delay);
    },
    [cancel, delay],
  );

  // 언마운트 후에 실행되지 않게 정리한다.
  useEffect(() => cancel, [cancel]);

  return { debounced, cancel };
}
